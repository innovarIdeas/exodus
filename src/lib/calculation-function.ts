import { ICoverDesign, IIllustrationType, ILayoutType, IPageSize, IPaperType } from "@/models/models";
import prisma from "./prisma";

async function fetchConstants () {
  try {
    const constantsArray = await prisma.constants.findMany();
    const constantsMap: Record<string, number> = {};

    constantsArray.forEach((constant: { shortcode: string; value: number }) => {
      constantsMap[constant.shortcode] = constant.value;
    });

    return constantsMap;
  } catch (error) {
    console.error("Error fetching constants:", error);
    throw new Error("Failed to fetch constants");
  }
}

export async function PaperTypePrice (paperType: IPaperType) {
  try {
    const constantsMap = await fetchConstants();
    const normalizedPaperType = paperType.trim().toUpperCase();

    switch (normalizedPaperType) {
      case "CREAM_PAPER_LARGE":
        return constantsMap.CostOfCreamPaper;
      case "WHITE_PAPER_LARGE":
        return constantsMap.CostOfWhitePaper;
      case "ART_PAPER_135":
        return constantsMap.CostOfArtPaper135;
      case "NEWS_PRINT":
        return constantsMap.CostOfNewsPrint;
      default:
        throw new Error(`Unsupported paperType: ${normalizedPaperType}`);
    }
  } catch (error) {
    console.error("Error in PaperTypePrice:", error);
    throw new Error("Failed to calculate PaperTypePrice");
  }
}

export async function CostPerUnitOfPaperUnit (paperType: IPaperType) {
  try {
    const constantsMap = await fetchConstants();
    const paperTypePrice = await PaperTypePrice(paperType);

    return paperTypePrice + constantsMap.PaperUnitDivider;
  } catch (error) {
    console.error("Error in CostPerUnitOfPaperUnit:", error);
    throw new Error("Failed to calculate CostPerUnitOfPaperUnit");
  }
}

export async function CostOfCardUnit () {
  try {
    const constantsMap = await fetchConstants();

    return constantsMap.CostOfArtCard + constantsMap.CardUnitDivider;
  } catch (error) {
    console.error("Error in CostOfCardUnit:", error);
    throw new Error("Failed to calculate CostOfCardUnit");
  }
}

export async function CostOfCoverComponentPerBook (pageSize: string) {
  try {
    const constantsMap = await fetchConstants();

    let costOfPrintingDigitalCard;
    let laminationMultiplier;

    if (pageSize === "A5") {
      costOfPrintingDigitalCard = constantsMap.CostOfPrintingDigitalA4Card;
      laminationMultiplier = 1;
    } else if (pageSize === "A4") {
      costOfPrintingDigitalCard = constantsMap.CostOfPrintingDigitalA3Card;
      laminationMultiplier = 2;
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    const costOfCoverComponentPerBook =
      costOfPrintingDigitalCard + constantsMap.CostOfLamination * laminationMultiplier;

    return costOfCoverComponentPerBook;
  } catch (error) {
    console.error(`Error in CostOfCoverComponentPerBook for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfCoverComponentPerBook for ${pageSize}`);
  }
}

export async function CostOfPageComponentPerBook (paperType: IPaperType, pageSize: string, numberOfPages: number) {
  try {
    const constantsMap = await fetchConstants();
    const costPerUnitOfPaperUnit = await CostPerUnitOfPaperUnit(paperType);

    let consumablesMultiplier;

    if (pageSize === "A5") {
      consumablesMultiplier = constantsMap.ConsumablesMultiplier;
    } else if (pageSize === "A4") {
      consumablesMultiplier = constantsMap.ConsumablesMultiplier * 2;
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    const costOfPageComponentPerBook = (costPerUnitOfPaperUnit + consumablesMultiplier) * numberOfPages;

    return costOfPageComponentPerBook;
  } catch (error) {
    console.error(`Error in CostOfPageComponentPerBook for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfPageComponentPerBook for ${pageSize}`);
  }
}

export async function CostOfColouredInsertPerBook (pageSize: string, numberOfColouredPages: number) {
  try {
    const constantsMap = await fetchConstants();
    let result;

    if (pageSize === "A5") {
      result = (constantsMap.CostOfPrintingDigitalColourInsertA4 / 2) * numberOfColouredPages ? numberOfColouredPages : 1 ;
    } else if (pageSize === "A4") {
      result =
        constantsMap.CostOfPrintingDigitalColourInsertA4 * numberOfColouredPages
          ? numberOfColouredPages
          : 1;
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    return result;
  } catch (error) {
    console.error(`Error in CostOfColouredInsertPerBook for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfColouredInsertPerBook for ${pageSize}`);
  }
}

export async function CostOfPerfectingBindingPerOrder (pageSize: string, numberOfPages: number, numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;
    let perfectBindingConstant;

    if (pageSize === "A5") {
      if (numberOfPages <= 50) {
        perfectBindingConstant = constantsMap.A5PerfectBindingConstant * 1;
      } else if (numberOfPages >= 51 && numberOfPages <= 300) {
        perfectBindingConstant = constantsMap.A5PerfectBindingConstant * 1.8;
      } else if (numberOfPages >= 301 && numberOfPages <= 600) {
        perfectBindingConstant = constantsMap.A5PerfectBindingConstant * 2.3;
      } else if (numberOfPages >= 601 && numberOfPages <= 900) {
        perfectBindingConstant = constantsMap.A5PerfectBindingConstant * 3.3;
      } else {
        perfectBindingConstant = constantsMap.A5PerfectBindingConstant * 7;
      }
    } else if (pageSize === "A4") {
      if (numberOfPages <= 50) {
        perfectBindingConstant = constantsMap.A4PerfectBindingConstant * 1;
      } else if (numberOfPages >= 51 && numberOfPages <= 300)  {
        perfectBindingConstant = constantsMap.A4PerfectBindingConstant * 2;
      } else if (numberOfPages >= 301 && numberOfPages <= 600) {
        perfectBindingConstant = constantsMap.A4PerfectBindingConstant * 3.45;
      } else if (numberOfPages >= 601 && numberOfPages <= 900) {
        perfectBindingConstant = constantsMap.A4PerfectBindingConstant * 4.75;
      } else {
        perfectBindingConstant = constantsMap.A4PerfectBindingConstant * 10.25;
      }
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    result = perfectBindingConstant + ((numberOfPages / 4) * numberOfCopies);

    return Math.max(result, 5000);
  } catch (error) {
    console.error(`Error in CostOfPerfectingBindingPerOrder for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfPerfectingBindingPerOrder for ${pageSize}`);
  }
}

export async function CostOfWrappingPerOrder (numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    const result = constantsMap.WrappingMinimumCost + Math.round(numberOfCopies / 50) * constantsMap.CostOfWrappingUnit;

    return result;
  } catch (error) {
    console.error("Error in CostOfWrappingPerOrder:", error);
    throw new Error("Failed to calculate CostOfA4PerfectingBindingPerOrder");
  }
}

export async function CostOfTrimmingPerOrder (numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    const result = constantsMap.TrimMinimumCost + constantsMap.CostOfTrimPerUnit + numberOfCopies;

    return result;
  } catch (error) {
    console.error("Error in CostOfTrimmingPerOrder:", error);
    throw new Error("Failed to calculate CostOfTrimmingPerOrder");
  }
}

export async function CostOfFinishingComponent (numberOfCopies: number, pageSize: string, numberOfPages: number) {
  try {
    const costOfPerfectBinding = await CostOfPerfectingBindingPerOrder(pageSize, numberOfPages, numberOfCopies);
    const costOfTrimmingPerOrder = await CostOfTrimmingPerOrder(numberOfCopies);
    const costOfWrappingPerOrder = await CostOfWrappingPerOrder(numberOfCopies);
    const result = costOfPerfectBinding + costOfTrimmingPerOrder + costOfWrappingPerOrder;

    return result;
  } catch (error) {
    console.error("Error in CostOfFinishingComponent:", error);
    throw new Error("Failed to calculate CostOfFinishingComponent");
  }
}

export async function CostOfEmbossing (numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if (numberOfCopies >= 1 && numberOfCopies <= 200) {
      result = constantsMap.MinimumCostOfEmbossing * 1 ;
    } else if (numberOfCopies >= 201 && numberOfCopies <= 500) {
      result = constantsMap.MinimumCostOfEmbossing * 1.25 ;
    } else if (numberOfCopies >= 501 && numberOfCopies <= 600) {
      result = constantsMap.MinimumCostOfEmbossing * 1.6;
    } else {
      result = constantsMap.MinimumCostOfEmbossing * 1.5 + (constantsMap.CostOfEmbossingPerUnit * numberOfCopies);
    }

    return result;
  } catch (error) {
    console.error("Error in CostOfEmbossing:", error);
    throw new Error("Failed to calculate CostOfEmbossing");
  }
}

export async function CostOfSpotLamnation (numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if (numberOfCopies >= 1 && numberOfCopies <= 200) {
      result = constantsMap.MinimumCostOfSpot * 1 ;
    } else if (numberOfCopies >= 201 && numberOfCopies <= 500) {
      result = constantsMap.MinimumCostOfSpot * 1.25 ;
    } else if (numberOfCopies >= 501 && numberOfCopies <= 600) {
      result = constantsMap.MinimumCostOfSpot * 1.6;
    } else {
      result = constantsMap.MinimumCostOfSpot * 1.5 + (constantsMap.CostOfSpotPerUnit * numberOfCopies);
    }

    return result;
  } catch (error) {
    console.error("Error in CostOfSpotLamnation:", error);
    throw new Error("Failed to calculate CostOfSpotLamnation");
  }
}

export async function CostOfFoiling (numberOfCopies: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if (numberOfCopies >= 1 && numberOfCopies <= 200) {
      result = constantsMap.MinimumCostOfFoiling * 1 ;
    } else if (numberOfCopies >= 201 && numberOfCopies <= 500) {
      result = constantsMap.MinimumCostOfFoiling * 1.25 ;
    } else if (numberOfCopies >= 501 && numberOfCopies <= 600) {
      result = constantsMap.MinimumCostOfFoiling * 1.6;
    } else {
      result = constantsMap.MinimumCostOfFoiling * 1.5 + (constantsMap.CostOfFoilingPerUnit * numberOfCopies);
    }

    return result;
  } catch (error) {
    console.error("Error in CostOfFoiling:", error);
    throw new Error("Failed to calculate CostOfFoiling");
  }
}

export async function CostOfAddOnComponent (numberOfCopies: number) {
  try {
    const costOfEmbossingPerOrder = await  CostOfEmbossing(numberOfCopies);
    const costOfSpotLaminationPerOder = await CostOfSpotLamnation(numberOfCopies);
    const costOfFoilingPerOrder = await CostOfFoiling(numberOfCopies);
    const result = costOfEmbossingPerOrder  + costOfSpotLaminationPerOder + costOfFoilingPerOrder;

    return result;
  } catch (error) {
    console.error("Error in CostOfAddOnComponent:", error);
    throw new Error("Failed to calculate CostOfAddOnComponent");
  }
}

export async function CostOfCoverComponentForBulk (numberOfCopies: number, pageSize: IPageSize) {
  try {
    const constantsMap = await fetchConstants();
    const cardUnitCost = await CostOfCardUnit();
    let result = 0;

    if (pageSize === "A5") {
      result = (constantsMap.CostOfComputerToPlate * 4) +
        (constantsMap.CostOfColouredImpressionMO * (numberOfCopies / 4000)) +
        (constantsMap.CostOfLamination * numberOfCopies) +
        (cardUnitCost * (numberOfCopies + 600));
    } else if (pageSize === "A4") {
      result = (constantsMap.CostOfComputerToPlate * 4) +
        (constantsMap.CostOfColouredImpressionMO * (numberOfCopies / 2000)) +
        (constantsMap.CostOfLamination * 2 * numberOfCopies) +
        ((cardUnitCost * 2) * (numberOfCopies + 300));
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    return result;
  } catch (error) {
    console.error(`Error in CostOfCoverComponentForBulk for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfCoverComponentForBulk for ${pageSize}`);
  }
}

export async function CostOfPrintSet (pageSize: IPageSize, numberOfPages: number) {
  let result = 0;

  if (pageSize === "A5") {
    result = Math.round(numberOfPages / 8);
  } else if (pageSize === "A4") {
    result = Math.round(numberOfPages / 4);
  } else {
    throw new Error(`Unsupported page size: ${pageSize}`);
  }

  return result;
}

export function CostOfPrintingImpressionSet (numberOfCopies: number) {
  let result = 0;

  result = Math.round(numberOfCopies / 1000);

  return result;
}

export async function CostOfBlackPagePerOrder (numberOfCopies: number, pageSize: IPageSize, numberOfPages: number, paperType: IPaperType) {
  try {
    const constantsMap = await fetchConstants();
    const costOfPrintSet =  await CostOfPrintSet(pageSize, numberOfPages);
    const costOfPrintSetImpression = CostOfPrintingImpressionSet(numberOfCopies);
    const paperTypePrice = await PaperTypePrice(paperType);
    let result = 0;

    if (pageSize === "A5") {
      result = constantsMap.CostOfComputerToPlate * 4 * costOfPrintSet + (constantsMap.CostOfBlackImpression * costOfPrintSet * costOfPrintSetImpression) + (((paperTypePrice / 1000) * (numberOfCopies + 80)) * (costOfPrintSet / 2) * costOfPrintSetImpression) + ((constantsMap.Collation * (costOfPrintSet / 2)) * costOfPrintSetImpression);
    } else if (pageSize === "A4") {
      result = constantsMap.CostOfComputerToPlate * costOfPrintSet + (constantsMap.CostOfBlackImpression * costOfPrintSet * costOfPrintSetImpression) + (((paperTypePrice / 1000) * (numberOfCopies + 80)) * (costOfPrintSet / 2) * costOfPrintSetImpression) + ((constantsMap.Collation * (costOfPrintSet / 2)) * costOfPrintSetImpression);
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    return result;
  } catch (error) {
    console.error(`Error in CostOfBlackPagePerOrder for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfBlackPagePerOrder for ${pageSize}`);
  }
}

export async function CostOfColouredPagePerOrder (numberOfCopies: number, pageSize: IPageSize, numberOfPages: number, paperType: IPaperType) {
  try {
    const constantsMap = await fetchConstants();
    const costOfPrintSet =  await CostOfPrintSet(pageSize, numberOfPages);
    const costOfPrintSetImpression = CostOfPrintingImpressionSet(numberOfCopies);
    const paperTypePrice = await PaperTypePrice(paperType);
    let result = 0;

    if (pageSize === "A5") {
      result = constantsMap.CostOfComputerToPlate * 4 * costOfPrintSet + (constantsMap.CostOfBlackImpression * costOfPrintSet * costOfPrintSetImpression) + (((paperTypePrice / 1000) * (numberOfCopies + 120)) * (costOfPrintSet / 2) * costOfPrintSetImpression) + ((constantsMap.Collation * (costOfPrintSet / 2)) * costOfPrintSetImpression);
    } else if (pageSize === "A4") {
      result = constantsMap.CostOfComputerToPlate * 4 * costOfPrintSet + (constantsMap.CostOfBlackImpression * costOfPrintSet * costOfPrintSetImpression) + (((paperTypePrice / 1000) * (numberOfCopies + 120)) * (costOfPrintSet / 2) * costOfPrintSetImpression) + ((constantsMap.Collation * (costOfPrintSet / 2)) * costOfPrintSetImpression);
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    return result;
  } catch (error) {
    console.error(`Error in CostOfBlackPagePerOrder for ${pageSize}:`, error);
    throw new Error(`Failed to calculate CostOfBlackPagePerOrder for ${pageSize}`);
  }
}

export async function TotalCostOfBooks (numberOfCopies: number, pageSize: IPageSize, numberOfPages: number, paperType: IPaperType, numberOfColouredPages: number) {
  try {
    const constantsMap = await fetchConstants();
    const costOfCoverComponentPerBook = await CostOfCoverComponentPerBook(pageSize);
    const costOfColouredPages = await CostOfColouredInsertPerBook(pageSize, numberOfColouredPages);
    const costOfFinishingComponent = await CostOfFinishingComponent(numberOfCopies, pageSize, numberOfPages);
    const costOfAddOnComponent  = await CostOfAddOnComponent(numberOfCopies);
    const costOfBlackPagePerBook = await CostOfPageComponentPerBook(paperType, pageSize, numberOfPages);

    let result = 0;

    if (numberOfCopies <= 499) {
      result = ((costOfCoverComponentPerBook + costOfBlackPagePerBook) +
       (constantsMap.CostOfHardBack * constantsMap.CostOfJacket + costOfColouredPages + constantsMap.CostOfNylon) * numberOfCopies
       + (costOfFinishingComponent + costOfAddOnComponent + constantsMap.ServiceChargeThreshold)) * constantsMap.MarkupPercentageForPrintOnDemand;
    } else if (numberOfCopies >= 500) {
      result = costOfCoverComponentPerBook + costOfBlackPagePerBook + (constantsMap.CostOfHardBack * numberOfCopies) +
      constantsMap.CostOfJacket + (constantsMap.CostOfNylon * numberOfCopies) +
       (costOfFinishingComponent + costOfAddOnComponent + constantsMap.ServiceChargeThreshold) * constantsMap.MarkupPercentageBulk;
    } else {
      throw new Error(`Unsupported page size: ${pageSize}`);
    }

    return result;
  } catch (error) {
    console.error("Error in TotalCostOfBook", error);
    throw new Error("Failed to calculate TotalCostOfBooks");
  }
}

export async function CostOfIllustration (numberOfIllustrations: number,  type: IIllustrationType) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if(type === "Simple-black-and-white-sketch-and-linking") {
      result = constantsMap.SketchConstant * numberOfIllustrations;
    }else if(type === "Full-color-3D-illustration") {
      result = constantsMap.ThreeDColouredIllustrationConstant * numberOfIllustrations;
    }else if(type === "Full-color-flat-2D-illustration") {
      result = constantsMap.TwoDColouredIllustrationConstant * numberOfIllustrations;
    }else{
      console.error("Invalid Illustration type", type);
    }

    return result ;
  } catch (error) {
    console.error("Error in CostOfSimpleBlackAndWhiteSketch", error);
    throw new Error("Failed to calculate CostOfSimpleBlackAndWhiteSketch");
  }
}

export async function CostOfISBN (type: boolean) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if(type) {
      result = constantsMap.ISBNByMagicWand;
    }else{
      result = constantsMap.ISBNByPersonalAndCompanyNameConstant;
    }

    return result ;
  } catch (error) {
    console.error("Error in Calculating ISBN", error);
    throw new Error("Error in Calculating ISBN");
  }
}

export async function CostOfLayout  (numberOfWords: number, type: ILayoutType) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if(type === "Poetry-Layout") {
      result = constantsMap.PoetryLayoutConstant + (numberOfWords * constantsMap.PoetryLayoutVariable);
    }else if(type === "Poetry-with-pictures") {
      result = constantsMap.PoetryWithImagesLayoutConstant + (numberOfWords * constantsMap.PoetryWithImagesVariable);
    }else if(type === "Fiction-or-non-fiction-layout-with-pictures-graphics-and-chart") {
      result = constantsMap.FictionOrNonFictionWithImagesConstants + (numberOfWords * constantsMap.NonFictionLayoutWithImagesVariable);
    }else if(type === "Simple-fiction-or-non-fiction-layout-with-no-graphics-or-image") {
      result = constantsMap.FictionOrNonFictionLayoutConstant + (numberOfWords * constantsMap.NonFictionLayoutNoImagesVariable);
    }else{
      console.error("Invalid Layout type", type);
    }

    return result ;
  } catch (error) {
    console.error("Error in Calculating layout cost", error);
    throw new Error("Error in Calculating layout cost");
  }
}

export async function CostOfCoverDesign  (numberOfWords: number, type: ICoverDesign) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    if(type === "Graphics-with-online-images-or-author-supplied-image") {
      result = constantsMap.GraphicsDesignWithImagesConstant;
    }else if(type === "Graphics-with-premium-paid-image") {
      result = constantsMap.PremiumImageDesignConstant;
    }else if(type === "Artist-Illustrated") {
      result = constantsMap.ArtistIllustrationConstant;
    }else{
      console.error("Invalid Cover design type", type);
    }

    return result ;
  } catch (error) {
    console.error("Error in Calculating Cover design", error);
    throw new Error("Error in Calculating Cover design");
  }
}

export async function CostOfEditting (numberOfWords: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    result = constantsMap.EditingConstant * (numberOfWords * constantsMap.EditingVariable);

    return result ;
  } catch (error) {
    console.error("Error in CostOfEditting", error);
    throw new Error("Failed to calculate CostOfEditting");
  }
}

export async function CostOfProofreading (numberOfWords: number) {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    result = constantsMap.ProofreadingConstant * (numberOfWords * constantsMap.ProofreadingVariable);

    return result ;
  } catch (error) {
    console.error("Error in CostOfProofreading", error);
    throw new Error("Failed to calculate CostOfProofreading");
  }
}

export async function CostOfAmazonKDP () {
  try {
    const constantsMap = await fetchConstants();
    let result = 0;

    result = constantsMap.AmazonKDPConstant;

    return result ;
  } catch (error) {
    console.error("Error in CostOfAmazonKDP", error);
    throw new Error("Failed to calculate CostOfProofreading");
  }
}

export async function TotalCostForWorkInProgress (numberOfIllustrations: number, illustration: boolean,
  illustrationtType: IIllustrationType, ISBNType: boolean, numberOfWords: number, layoutType: ILayoutType, insideLayout: boolean,
  coverDesignType: ICoverDesign, coverDesign: boolean, editing: boolean, proofReading: boolean, amazon: boolean) {
  try {
    let result = 0;
    const costOfIllustration = await CostOfIllustration(numberOfIllustrations, illustrationtType) * (illustration ? 1 : 0);
    const costOfISBN   = await CostOfISBN(ISBNType);
    const costOfLayout  = await CostOfLayout(numberOfWords, layoutType) * (insideLayout ? 0 : 1);
    const costOfCoverDesign = await CostOfCoverDesign(numberOfWords, coverDesignType) * (coverDesign ? 0 : 1);
    const costOfEditting = await CostOfEditting(numberOfWords) * (editing ? 1 : 0);
    const costOfProofreading = await CostOfProofreading(numberOfWords) * (proofReading ? 1 : 0);
    const costOfAmazonKDP = await CostOfAmazonKDP() * (amazon ? 1 : 0);

    result  = costOfIllustration + costOfISBN + costOfLayout +
    costOfCoverDesign + costOfEditting + costOfProofreading +  costOfAmazonKDP;

    return result;
  }
  catch (error) {
    console.error("Error in TotalCostForInProgress", error);
    throw new Error("Failed to calculate TotalCostForInProgress");
  }
}

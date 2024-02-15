import { IPageSize, IPaperType } from "@/models/models";
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
    const constantsMap = await fetchConstants();    const normalizedPaperType = paperType.trim().toUpperCase();

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
      result = (constantsMap.CostOfPrintingDigitalColourInsertA4 / 2) * numberOfColouredPages;
    } else if (pageSize === "A4") {
      result = constantsMap.CostOfPrintingDigitalColourInsertA4 * numberOfColouredPages;
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
    const result = constantsMap.TrimMinimumCost + constantsMap.CostOfTrimUnit + numberOfCopies;

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


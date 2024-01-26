"use client"

import { createContext, ReactNode, useState } from 'react';
import { ITempBook } from '@/models/models';

interface ContextValues {
  readyToPrint: boolean;
  setReadyToPrint: React.Dispatch<React.SetStateAction<boolean>>;
  workInProgress: boolean;
  setWorkInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  book: boolean;
  setBook: React.Dispatch<React.SetStateAction<boolean>>;
  magazine: boolean;
  setMagazine: React.Dispatch<React.SetStateAction<boolean>>;
  stationary: boolean;
  setStationary: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfWords: number;
  setNumberOfWords: React.Dispatch<React.SetStateAction<number>>;
  bwPrint: boolean;
  setBwPrint: React.Dispatch<React.SetStateAction<boolean>>;
  bothPrint: boolean;
  setBothPrint: React.Dispatch<React.SetStateAction<boolean>>;
  colorPrint: boolean;
  setColorPrint: React.Dispatch<React.SetStateAction<boolean>>;
  creamPaper: boolean;
  setCreamPaper: React.Dispatch<React.SetStateAction<boolean>>;
  hardCover: boolean;
  setHardCover: React.Dispatch<React.SetStateAction<boolean>>;
  glossyPaper: boolean;
  setGlossyPaper: React.Dispatch<React.SetStateAction<boolean>>;
  newsPaper: boolean;
  setNewsPaper: React.Dispatch<React.SetStateAction<boolean>>;
  binding: string;
  setBinding: React.Dispatch<React.SetStateAction<string>>;
  whitePaper: boolean;
  setWhitePaper: React.Dispatch<React.SetStateAction<boolean>>;
  noOfBooks: number;
  setNoOfBooks: React.Dispatch<React.SetStateAction<number>>;
  potrait: boolean;
  setPotrait: React.Dispatch<React.SetStateAction<boolean>>;
  noOfPages: number;
  setNoOfPages: React.Dispatch<React.SetStateAction<number>>;
  bookSize: string;
  setBookSize: React.Dispatch<React.SetStateAction<string>>;
  qualityOfColor: number;
  setQualityOfColor: React.Dispatch<React.SetStateAction<number>>;
  qualityOfBw: number;
  setQualityOfBw: React.Dispatch<React.SetStateAction<number>>;
  insideLayout: boolean;
  setInsideLayout: React.Dispatch<React.SetStateAction<boolean>>;
  proofReading: boolean;
  setProofReading: React.Dispatch<React.SetStateAction<boolean>>;
  coverDesign: boolean;
  setCoverDesign: React.Dispatch<React.SetStateAction<boolean>>;
  isbn: boolean;
  setIsbn: React.Dispatch<React.SetStateAction<boolean>>;
  embossing: boolean;
  setEmbossing: React.Dispatch<React.SetStateAction<boolean>>;
  foiling: boolean;
  setFoiling: React.Dispatch<React.SetStateAction<boolean>>;
  lamination: string;
  setLamination: React.Dispatch<React.SetStateAction<string>>;
  deliveryName: string;
  setDeliveryName: React.Dispatch<React.SetStateAction<string>>;
  deliveryPhone: string;
  setDeliveryPhone: React.Dispatch<React.SetStateAction<string>>;
  shippingAddress: string;
  setShippingAddress: React.Dispatch<React.SetStateAction<string>>;
  shippingState: string;
  setShippingState: React.Dispatch<React.SetStateAction<string>>;
  shippingInstruction: string;
  setShippingInstruction: React.Dispatch<React.SetStateAction<string>>;
  pickUp: boolean;
  setPickUp: React.Dispatch<React.SetStateAction<boolean>>;
  projectType: string;
  setProjectType: React.Dispatch<React.SetStateAction<string>>;
  published: boolean;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
  wordCount: number;
  setWordCount: React.Dispatch<React.SetStateAction<number>>;
  currentBookFormat: string;
  setCurrentBookFormat: React.Dispatch<React.SetStateAction<string>>;
  insideLayoutType: string;
  setInsideLayoutType: React.Dispatch<React.SetStateAction<string>>;
  artIllustration: boolean;
  setArtIllustration: React.Dispatch<React.SetStateAction<boolean>>;
  artIllustrationType: string;
  setArtIllustrationType: React.Dispatch<React.SetStateAction<string>>;
  paperInfo: boolean;
  setPaperInfo: React.Dispatch<React.SetStateAction<boolean>>;
  bookInfo: boolean;
  setBookInfo: React.Dispatch<React.SetStateAction<boolean>>;
  bookCoverInfo: boolean;
  setBookCoverInfo: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryOption: boolean;
  setDeliveryOption: React.Dispatch<React.SetStateAction<boolean>>;
  confirmOrder: boolean;
  setConfirmOrder: React.Dispatch<React.SetStateAction<boolean>>;
  paperInfoFormOne: boolean;
  setPaperInfoFormOne: React.Dispatch<React.SetStateAction<boolean>>;
  paperInfoFormTwo: boolean;
  setPaperInfoFormTwo: React.Dispatch<React.SetStateAction<boolean>>;
  paperInfoFormThree: boolean;
  setPaperInfoFormThree: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  bookName: string;
  setBookName: React.Dispatch<React.SetStateAction<string>>;
  newsPrint: boolean;
  setNewsPrint: React.Dispatch<React.SetStateAction<boolean>>;
  submitForm: boolean;
  setSubmitForm: React.Dispatch<React.SetStateAction<boolean>>;
  termsAndCondition: boolean;
  setTermsAndCondition: React.Dispatch<React.SetStateAction<boolean>>;
  nextOpen: boolean;
  setNextOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export const ContextStore = createContext<ContextValues | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [workInProgress, setWorkInProgress] = useState(false);
  const [book, setBook] = useState(false);
  const [magazine, setMagazine] = useState(false);
  const [stationary, setStationary] = useState(false);
  const [numberOfWords, setNumberOfWords] = useState(0)
  const [hardCover, setHardCover] = useState(false)
  const [bwPrint, setBwPrint] = useState(false)
  const [bothPrint, setBothPrint] = useState(false)
  const [colorPrint, setColorPrint] = useState(false)
  const [creamPaper, setCreamPaper] = useState(false)
  const [glossyPaper, setGlossyPaper] = useState(false)
  const [newsPaper, setNewsPaper] = useState(false)
  const [binding, setBinding] = useState('')
  const [whitePaper, setWhitePaper] = useState(false)
  const [noOfBooks, setNoOfBooks] = useState(0)
  const [potrait, setPotrait] = useState(true)
  const [noOfPages, setNoOfPages] = useState(0)
  const [qualityOfColor, setQualityOfColor] = useState(0)
  const [qualityOfBw, setQualityOfBw] = useState(0)
  const [bookSize, setBookSize] = useState('')
  const [insideLayout, setInsideLayout] = useState(false)
  const [proofReading, setProofReading] = useState(false)
  const [coverDesign, setCoverDesign] = useState(false)
  const [isbn, setIsbn] = useState(false)
  const [embossing, setEmbossing] = useState(false)
  const [foiling, setFoiling] = useState(false)
  const [lamination, setLamination] = useState('')
  const [deliveryName, setDeliveryName] = useState('')
  const [deliveryPhone, setDeliveryPhone] = useState('')
  const [pickUp, setPickUp] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingState, setShippingState] = useState('')
  const [shippingInstruction, setShippingInstruction] = useState('')
  const [projectType, setProjectType] = useState('')
  const [published, setPublished] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [currentBookFormat, setCurrentBookFormat] = useState('')
  const [insideLayoutType, setInsideLayoutType] = useState('')
  const [artIllustration, setArtIllustration] = useState(false)
  const [artIllustrationType, setArtIllustrationType] = useState('')
  const [bindong, setBindong] = useState()
  const [email, setEmail] = useState('')
  const [bookName, setBookName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [newsPrint, setNewsPrint] = useState(false)

  const [paperInfo, setPaperInfo] = useState(true)
  const [bookInfo, setBookInfo] = useState(false)
  const [bookCoverInfo, setBookCoverInfo] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(false)
  const [paperInfoFormOne, setPaperInfoFormOne] = useState(false)
  const [paperInfoFormTwo, setPaperInfoFormTwo] = useState(false)
  const [paperInfoFormThree, setPaperInfoFormThree] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitForm, setSubmitForm] = useState(false)
  const [termsAndCondition, setTermsAndCondition] = useState(false)
  const [nextOpen, setNextOpen] = useState(false)
  

  const contextValue: ContextValues = {readyToPrint, setReadyToPrint, workInProgress, setWorkInProgress, book, setBook, magazine, setMagazine, stationary, setStationary, numberOfWords, setNumberOfWords, hardCover, setHardCover, bwPrint, setBwPrint, bothPrint, setBothPrint, colorPrint, setColorPrint, creamPaper, setCreamPaper, glossyPaper, setGlossyPaper, newsPaper, setNewsPaper, binding, setBinding, whitePaper, setWhitePaper, noOfBooks, setNoOfBooks, potrait, setPotrait, noOfPages, setNoOfPages, qualityOfColor, setQualityOfColor, qualityOfBw, setQualityOfBw, bookSize, setBookSize, insideLayout, setInsideLayout, proofReading, setProofReading, coverDesign, setCoverDesign, isbn, setIsbn, embossing, setEmbossing, foiling, setFoiling, lamination, setLamination, deliveryName, setDeliveryName, deliveryPhone, setDeliveryPhone, pickUp, setPickUp, shippingAddress, setShippingAddress, shippingState, setShippingState, shippingInstruction, setShippingInstruction, projectType, setProjectType, published, setPublished, wordCount, setWordCount, currentBookFormat, setCurrentBookFormat, insideLayoutType, setInsideLayoutType, artIllustration, setArtIllustration, artIllustrationType, setArtIllustrationType, paperInfo, setPaperInfo, bookInfo, setBookInfo, bookCoverInfo, setBookCoverInfo, deliveryOption, setDeliveryOption, confirmOrder, setConfirmOrder, paperInfoFormOne, setPaperInfoFormOne, paperInfoFormTwo, setPaperInfoFormTwo, paperInfoFormThree, setPaperInfoFormThree, currentStep, setCurrentStep, name, setName, phoneNumber, setPhoneNumber, bookName, setBookName, email, setEmail, newsPrint, setNewsPrint, submitForm, setSubmitForm, termsAndCondition, setTermsAndCondition, nextOpen, setNextOpen };

  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  );
};

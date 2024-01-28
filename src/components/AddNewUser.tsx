
import React, { useState } from "react";
import AddUser from "./UserForm";
import AddUserRole from "./UserRoleForm";

const AddNewUser = () => {
  const [step, setStep] = useState(1);
  const [userID, setUserID] = useState<string>();

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddUser nextStep={nextStep} setUserID={setUserID}/>
        );
      case 2:
        return (
          <AddUserRole nextStep={nextStep} userID={userID}/>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default AddNewUser;


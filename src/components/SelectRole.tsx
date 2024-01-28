import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getRoles } from "@/lib/api-call";

type TSelectRoles = {
  value: string;
  label: string;
  id: string;
};

const SelectRoles = ({ ...field }) => {
  const [allOptions, setAllOptions] = useState<TSelectRoles[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      getRoles().then((res: TSelectRoles[]) => {
        setAllOptions(res);
      }
      );
    };

    fetchRoles();
  }, [field]);

  return (
    <Select
      { ...field }
      defaultValue={[]}
      isMulti
      name="roles"
      options={allOptions as never}
      isSearchable
      className=""
      classNamePrefix="roles"
    />
  );
};

export default SelectRoles;

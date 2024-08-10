import { useCallback, useEffect, useState } from "react";

function useStorage<T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject?.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    if (typeof defaultValue === "function") return defaultValue();
    return defaultValue;
  });
  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

export default useStorage;

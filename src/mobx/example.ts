import { action, observable } from "mobx";

export const useExample = observable({
  exam: "",
  setExample: action((e: any) => {
    useExample.exam = e;
  }),
});

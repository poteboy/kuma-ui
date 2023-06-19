import { Project, Node } from "ts-morph";
import { PseudoProps, isStyledProp, isPseudoProps } from "@kuma-ui/system";

const project = new Project({});

const compile = (code: string, id: string) => {
  const sourceFile = project.createSourceFile(id, code, { overwrite: true });

  sourceFile.forEachDescendant((node: Node) => {});
};

type Extracted = {
  styledProps: { [key: string]: any };
  pseudoProps: PseudoProps;
  filteredAttributes: { [key: string]: any };
};
const extracted: Extracted = {
  styledProps: {},
  pseudoProps: {},
  filteredAttributes: {},
};

function assignValueToProp(prop: string, value: any): void {
  if (isStyledProp(prop)) {
    extracted.styledProps[prop] = value;
  } else if (isPseudoProps(prop)) {
    extracted.pseudoProps[prop] = value;
  } else {
    extracted.filteredAttributes[prop] = value;
  }
}

export { compile };

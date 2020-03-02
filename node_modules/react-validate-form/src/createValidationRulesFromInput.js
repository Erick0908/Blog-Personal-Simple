import React from "react";
import validationRules from "./validationRules";

const createValidationRulesFromInput = (Element, newValidationRules = {}) => {
  if (Element && Element.props && !Element.props.children) {
    Object.keys(validationRules).forEach(rule => {
      const value = Element.props[rule] || Element.props.type === rule;
      if (value) {
        newValidationRules[Element.props.name] = (newValidationRules[Element.props.name] || []);
        newValidationRules[Element.props.name].push(
          `${rule}${typeof value !== "boolean" ? `:${value}` : ""}`,
        );
      }
    });

    return newValidationRules;
  }

  if (!Element || !Element.props) {
    return newValidationRules;
  }

  React.Children.forEach(Element.props.children, c => createValidationRulesFromInput(c, newValidationRules));

  return newValidationRules;
};

export default createValidationRulesFromInput;

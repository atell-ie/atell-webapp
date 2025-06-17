import { useMemo } from "react";
import { camelize } from "humps";
import { useSelector } from "react-redux";
import helpers from "../lib/helpers";

/**
 * Use Asset-type Validation Rules Hook
 */
export default (typeId: number) => {
    const { typesList } = useSelector((state) => state);

    const next = useMemo(() => {
        if (typeId) {
            return typesList.validationRules.data
                .filter((item) => item.assetTypeId === typeId)
                .reduce((aggregate, rule) => {
                    const field = helpers.list.getItemForId(
                        typesList.validationFields,
                        rule.fieldId
                    );
                    return { ...aggregate, [camelize(field.value)]: rule };
                }, {});
        }
        return {};
    }, [typeId, typesList]);

    return next;
};

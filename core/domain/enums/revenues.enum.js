import z from "zod";

export const RevenuesCategoryEnumMap = [
    {"1": "salary"},
    {"2": "business"},
    {"3": "other"}
]

const RevenuesCategoryEnumValue = [
    "salary",
    "business",
    "other",
].map(key => ' ' +key)
export const RevenuesCategoryEnum = ["1", "2", "3"];
export const RevenuesCategorySchema = z.enum(RevenuesCategoryEnum, {
    type: '',
    invalid_type_error: `Revenues category must be one of the following values:${RevenuesCategoryEnumValue.toString()}.`,
    required_error: 'Revenues category is required.'
});

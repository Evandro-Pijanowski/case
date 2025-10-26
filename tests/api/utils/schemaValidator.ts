import Ajv from "ajv";
const ajv = new Ajv();

export const bookingSchema = {
  type: "object",
  properties: {
    firstname: { type: "string" },
    lastname: { type: "string" },
    totalprice: { type: "number" },
    depositpaid: { type: "boolean" },
    bookingdates: {
      type: "object",
      properties: {
        checkin: { type: "string" },
        checkout: { type: "string" },
      },
      required: ["checkin", "checkout"],
    },
    additionalneeds: { type: "string" },
  },
  required: ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates"],
};

export function validateSchema(schema: object, data: any) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    console.error(validate.errors);
  }
  return valid;
}
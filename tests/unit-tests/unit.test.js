import { formatDate } from "../../frontend/src/utils/date.js";
import { calculateAverage } from "../../frontend/src/utils/math.js";
import { assert } from "chai";

describe("Formatting date function", () => {
   it("Should format date correctly in default locale", () => {
      const inputDate = new Date("2024-04-21T12:00:00");
      const expectedOutput = new Date("2024-04-21T12:00:00").toLocaleString();

      const formattedDate = formatDate(inputDate);

      assert.equal(formattedDate, expectedOutput);
   });

   it("Should format date correctly in specified locale", () => {
      const inputDate = new Date("2024-04-21T12:00:00");
      const expectedOutput = new Date("2024-04-21T12:00:00").toLocaleString("en-US");

      const formattedDate = formatDate(inputDate);

      assert.equal(formattedDate, expectedOutput);
   });

   it('Should return "Invalid Date" when input date is invalid', () => {
      const invalidDate = "invalid date";

      const formattedDate = formatDate(invalidDate);

      assert.equal(formattedDate, "Invalid Date");
   });
});

describe("Calculating average function", () => {
   it("Should return the average of positive numbers", () => {
      const arr = [1, 2, 3, 4, 5];
      const expectedAverage = 3; // (1 + 2 + 3 + 4 + 5) / 5 = 3

      const result = calculateAverage(arr);

      assert.equal(result, expectedAverage);
   });

   it("Should return 0 for an empty array", () => {
      const arr = [];
      const expectedAverage = 0;

      const result = calculateAverage(arr);

      assert.equal(result, expectedAverage);
   });

   it("Should return NaN for an array containing non-numeric values", () => {
      const arr = ["a", "b", "c"];

      const result = calculateAverage(arr);

      assert.isNaN(result);
   });

   it("Should return NaN for an array containing a mixture of numeric and non-numeric values", () => {
      const arr = [1, "a", 2, "b", 3];

      const result = calculateAverage(arr);

      assert.isNaN(result);
   });
});

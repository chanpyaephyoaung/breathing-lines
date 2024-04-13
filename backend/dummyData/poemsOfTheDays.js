const dummyPoemsOfTheDays = [
   {
      isAwarded: true,
      awardedAt: new Date(),
   },
   {
      isAwarded: true,
      awardedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
   },
   {
      isAwarded: true,
      awardedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
   },
];

export default dummyPoemsOfTheDays;

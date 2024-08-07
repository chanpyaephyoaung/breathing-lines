const dummyPoemsOfTheDays = [
   {
      isAwarded: true,
      awardedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
   },
   {
      isAwarded: true,
      awardedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
   },
   {
      isAwarded: true,
      awardedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
   },
];

export default dummyPoemsOfTheDays;

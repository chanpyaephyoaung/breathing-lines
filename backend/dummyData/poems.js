const dummyPoems = [
   {
      title: "Theme in Yellow",
      content: `I spot the hills 
      With yellow balls in autumn. 
      I light the prairie cornfields 
      Orange and tawny gold clusters 
      And I am called pumpkins. 
      On the last of October 
      When dusk is fallen 

      Children join hands 
      And circle round me 
      Singing ghost songs 
      And love to the harvest moon; 
      I am a jack-o'-lantern 
      With terrible teeth 
      And the children know 
      I am fooling.
      `,
      genres: ["Love", "Romance"],
      coverImg: "/images/img-2.jpg",
      originalAuthor: "Carl Sandburg",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "drafted",
   },
   {
      title: "A Jelly-Fish",
      content: `Visible, invisible,
      A fluctuating charm,
      An amber-colored amethyst
      Inhabits it; your arm
      Approaches, and
      It opens and
      It closes;

      You have meant
      To catch it,
      And it shrivels;
      You abandon
      Your intent—

      It opens, and it
      Closes and you
      Reach for it—
      The blue
      Surrounding it
      Grows cloudy, and
      It floats away
      From you.
      `,
      genres: ["Love", "Motivation"],
      coverImg: "",
      originalAuthor: "Marianne Moore",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Theme in Yellow",
      content: `I spot the hills 
      With yellow balls in autumn. 
      I light the prairie cornfields 
      Orange and tawny gold clusters 
      And I am called pumpkins. 
      On the last of October 
      When dusk is fallen 

      Children join hands 
      And circle round me 
      Singing ghost songs 
      And love to the harvest moon; 
      I am a jack-o'-lantern 
      With terrible teeth 
      And the children know 
      I am fooling.
      `,
      genres: ["Love", "Romance"],
      coverImg: "/images/img-1.jpg",
      originalAuthor: "Carl Sandburg",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "drafted",
   },
   {
      title: "Songs for the People",
      content: `Let me make the songs for the people,
      Songs for the old and young;
      Songs to stir like a battle-cry
      Wherever they are sung.
   
      Not for the clashing of sabres,
      For carnage nor for strife;
      But songs to thrill the hearts of men
      With more abundant life.
   
      Let me make the songs for the weary,
      Amid life's fever and fret,
      Till hearts shall relax their tension,
      And careworn brows forget.
   
      Let me sing for little children,
      Before their footsteps stray,
      Sweet anthems of love and duty,
      To float o'er life's highway.
   
      I would sing for the poor and aged,
      When shadows dim their sight;
      Of the bright and restful mansions,
      Where there shall be no night.
   
      Our world, so worn and weary,
      Needs music, pure and strong,
      To hush the jangle and discords
      Of sorrow, pain, and wrong.
   
      Music to soothe all its sorrow,
      Till war and crime shall cease; 
      And the hearts of men grown tender
      Girdle the world with peace.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "/images/img-2.jpg",
      originalAuthor: "Frances Ellen Watkins Harper",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "I Could Be a Whale Shark",
      content: `I am worried about tentacles.
      How you can still get stung
      even if the jelly arm disconnects
      from the bell. My husband
      swims without me—farther
      out to sea than I would like,
      buoyed by salt and rind of kelp.
      I am worried if I step too far
      into the China Sea, my baby
      will slow the beautiful kicks
      he has just begun since we landed.
      The quickening, they call it, 
      but all I am is slow, a moon jelly
      floating like a bag in the sea.
      Or a whale shark. Yes—I could be
      a whale shark, newly spotted
      with moles from the pregnancy—
      my wide mouth always open
      to eat and eat with a look that says
      Surprise! Did I eat that much?
      When I sleep, I am a flutefish,
      just lying there, swaying back
      and forth among the kelpy mess
      of sheets. You can see the wet
      of my dark eye awake, awake. 
      My husband is a pale blur 
      near the horizon, full of adobo
      and not waiting thirty minutes 
      before swimming. He is free
      and waves at me as he backstrokes
      past. This is how he prepares
      for fatherhood. Such tenderness
      still lingers in the air: the Roman
      poet Virgil gave his pet fly
      the most lavish funeral, complete
      with meat feast and barrels 
      of oaky wine. You can never know
      where or why you hear
      a humming on this soft earth.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "/images/img-3.jpg",
      originalAuthor: "Aimee Nezhukumatathil",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Negro Speaks of Rivers",
      content: `I've known rivers:
      I've known rivers ancient as the world and older than the
      flow of human blood in human veins.
      
      My soul has grown deep like the rivers.
      
      I bathed in the Euphrates when dawns were young.
      I built my hut near the Congo and it lulled me to sleep.
      I looked upon the Nile and raised the pyramids above it.
      I heard the singing of the Mississippi when Abe Lincoln
      went down to New Orleans, and I've seen its muddy
      bosom turn all golden in the sunset.
      
      I've known rivers:
      Ancient, dusky rivers.
      
      My soul has grown deep like the rivers.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "/images/img-4.jpg",
      originalAuthor: "Langston Hughes",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Christmas Bells",
      content: `I heard the bells on Christmas Day
      Their old, familiar carols play,
      And wild and sweet
      The words repeat
      Of peace on earth, good-will to men!
      
      And thought how, as the day had come,
      The belfries of all Christendom
      Had rolled along
      The unbroken song
      Of peace on earth, good-will to men!
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Henry Wadsworth Longfellow",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "She Walks in Beauty",
      content: `I.

      She walks in beauty, like the night
      Of cloudless climes and starry skies;
      And all that’s best of dark and bright
      Meet in her aspect and her eyes:
      Thus mellowed to that tender light
      Which heaven to gaudy day denies.
      
      II.
      
      One shade the more, one ray the less,
      Had half impaired the nameless grace
      Which waves in every raven tress,
      Or softly lightens o’er her face;
      Where thoughts serenely sweet express
      How pure, how dear their dwelling place.
      
      III.
      
      And on that cheek, and o’er that brow,
      So soft, so calm, yet eloquent,
      The smiles that win, the tints that glow,
      But tell of days in goodness spent,
      A mind at peace with all below,
      A heart whose love is innocent!
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "/images/img-4.jpg",
      originalAuthor: "George Gordon Byron",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "To A Sleeping Child. I.",
      content: ` Oh, 'tis a touching thing, to make one weep, -
      A tender infant with its curtain'd eye,
      Breathing as it would neither live nor die
      With that unchanging countenance of sleep!
      As if its silent dream, serene and deep,
      Had lined its slumber with a still blue sky

      So that the passive cheeks unconscious lie
      With no more life than roses - just to keep
      The blushes warm, and the mild, odorous breath.
      O blossom boy! so calm is thy repose.
      So sweet a compromise of life and death,
      'Tis pity those fair buds should e'er unclose
      For memory to stain their inward leaf,
      Tinging thy dreams with unacquainted grief.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Thomas Hood",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "A Thought Of The Nile",
      content: `It flows through old hushed Egypt and its sands,
      Like some grave mighty thought threading a dream,
      And times and things, as in that vision, seem
      Keeping along it their eternal stands,--
      Caves, pillars, pyramids, the shepherd bands
      That roamed through the young world, the glory extreme
      Of high Sesostris, and that southern beam,
      The laughing queen that caught the world's great hands.
      
      Then comes a mightier silence, stern and strong,
      As of a world left empty of its throng,
      And the void weighs on us; and then we wake,
      And hear the fruitful stream lapsing along
      Twixt villages, and think how we shall take
      Our own calm journey on for human sake.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "James Henry Leigh Hunt",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Lords Of The Visionary Eye",
      content: `I came upon a pool that shone,
      Clear, emerald-like, among the hills,
      That seemed old wizards round a stone
      Of magic that a vision thrills.
  
      And as I leaned and looked, it seemed
      Vague shadows gathered there and here
      A dream, perhaps the water dreamed
      Of some wild past, some long-dead year....
  
      A temple of a race unblessed
      Rose huge within a hollow land,
      Where, on an altar, bare of breast,
      One lay, a man, bound foot and hand.
  
      A priest, who served some hideous god,
      Stood near him on the altar stair,
      Clothed on with gold; and at his nod
      A multitude seemed gathered there.
  
      I saw a sword descend; and then
      The priest before the altar turned;
      He was not formed like mortal man,
      But like a beast whose eyeballs burned.
  
      Amorphous, strangely old, he glared
      Above the victim he had slain,
      Who lay with bleeding bosom bared,
      From which dripped slow a crimson rain.
  
      Then turned to me a face of stone
      And mocked above the murdered dead,
      That fixed its cold eyes on his own
      And cursed him with a look of dread.
  
      And then, it seemed, I knew the place,
      And how this sacrifice befell:
      I knew the god, the priest's wild face,
      I knew the dead man knew him well.
  
      And as I stooped again to look,
      I heard the dark hills sigh and laugh,
      And in the pool the water shook
      As if one stirred it with a staff.
  
      And all was still again and clear:
      The pool lay crystal as before,
      Temple and priest were gone; the mere
      Had closed again its magic door.
  
      A face was there; it seemed to shine
      As round it died the sunset's flame
      The victim's face? or was it mine?
      They were to me the very same.
  
      And yet, and yet could this thing be?
      And in my soul I seemed to know,
      At once, this was a memory
      Of some past life, lived long ago.
  
      Recorded by some secret sense,
      In forms that we as dreams retain;
      Some moment, as experience,
      Projects in pictures on the brain.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Madison Julius Cawein",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Sorrow",
      content: `Sorrow, on wing through the world for ever,
      Here and there for awhile would borrow
      Rest, if rest might haply deliver
      Sorrow.
  
      One thought lies close in her heart gnawn thorough
      With pain, a weed in a dried-up river,
      A rust-red share in an empty furrow.
  
      Hearts that strain at her chain would sever
      The link where yesterday frets to-morrow:
      All things pass in the world, but never
      Sorrow.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Algernon Charles Swinburne",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Fragment: Satan Broken Loose.",
      content: `A golden-winged Angel stood
      Before the Eternal Judgement-seat:
      His looks were wild, and Devils' blood
      Stained his dainty hands and feet.
      The Father and the Son
      Knew that strife was now begun.
      They knew that Satan had broken his chain,
      And with millions of daemons in his train,
      Was ranging over the world again.
      Before the Angel had told his tale,
      A sweet and a creeping sound
      Like the rushing of wings was heard around;
      And suddenly the lamps grew pale -
      The lamps, before the Archangels seven,
      That burn continually in Heaven.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Percy Bysshe Shelley",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Waking Year.",
      content: ` A lady red upon the hill
      Her annual secret keeps;
      A lady white within the field
      In placid lily sleeps!
  
      The tidy breezes with their brooms
      Sweep vale, and hill, and tree!
      Prithee, my pretty housewives!
      Who may expected be?
  
      The neighbors do not yet suspect!
      The woods exchange a smile --
      Orchard, and buttercup, and bird --
      In such a little while!
  
      And yet how still the landscape stands,
      How nonchalant the wood,
      As if the resurrection
      Were nothing very odd!
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Emily Elizabeth Dickinson",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Translation",
      content: `Chaste are their instincts, faithful is their fire,
      No foreign beauty tempts to false desire;
      The snow-white vesture, and the glittering crown,
      The simple plumage, or the glossy down
      Prompt not their loves: the patriot bird pursues
      His well acquainted tints, and kindred hues.

      Hence through their tribes no mix'd polluted flame,
      No monster-breed to mark the groves with shame;
      But the chaste blackbird, to its partner true,
      Thinks black alone is beauty's favourite hue.
      The nightingale, with mutual passion blest,
      Sings to its mate, and nightly charms the nest;
      While the dark owl to court its partner flies,
      And owns its offspring in their yellow eyes.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Oliver Goldsmith",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Godiva",
      content: ` Lingerie,
      black pumps
      a navel creamy enough
      to drown a kitten -
      the clothes assemble
      in microwave fashion
       - crackle of fire -
      the silver pants zoom across legs
      with curves so caress bound
      a formula racing driver
      might tumble.

      As eyes rise
      in jade lantern face
      & hair is brushed
      with all sheen aside,
      the lady is more than
      a Godiva
      or Goldwyn-Mayer cinematic production,
      this oasis of sparks,
      twin peaks of McKinley-Matterhorn fame,
      her calendar of words
      pulling Oil of Olay
      & perfumed honey thru
      each studied remark.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Paul Cameron Brown",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Meet Me In The Green Glen",
      content: `Love, meet me in the green glen,
      Beside the tall elm tree,
      Where the sweet briar smells so sweet agen;
      There come with me,
      Meet me in the green glen.
  
      Meet me at the sunset
      Down in the green glen,
      Where we've often met
      By hawthorn tree and foxes' den,
      Meet me in the green glen.
  
      Meet me in the green glen,
      By sweet briar bushes there;
      Meet me by your own sen,
      Where the wild thyme blossoms fair.
      Meet me in the green glen.
  
      Meet me by the sweet briar,
      By the mole hill swelling there;
      When the West glows like a fire
      God's crimson bed is there.
      Meet me in the green glen.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "John Clare",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Different Threats.",
      content: `
      I ONCE into a forest far
  
      My maiden went to seek,
      And fell upon her neck, when: "Ah!"
  
      She threaten'd, "I will shriek!"
  
      Then cried I haughtily: "I'll crush
  
      The man that dares come near thee!"
      "Hush!" whisper'd she: "My loved one, hush!
  
      Or else they'll overhear thee!"
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Johann Wolfgang von Goethe",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Death",
      content: `Through some strange sense of sight or touch
      I find what all have found before,
      The presence I have feared so much,
      The unknown's immaterial door.
  
      I seek not and it comes to me:
      I do not know the thing I find:
      The fillet of fatality
      Drops from my brows that made me blind.
  
      Point forward now or backward, light!
      The way I take I may not choose:
      Out of the night into the night,
      And in the night no certain clews.
  
      But on the future, dim and vast,
      And dark with dust and sacrifice,
      Death's towering ruin from the past
      Makes black the land that round me lies.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Madison Julius Cawein",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Tryst.",
      content: `I raised the veil, I loosed the bands,
      I took the dead thing from its place.
      Like a warm stream in frozen lands
      My lips went wandering on her face,
              My hands burnt in her hands.

      She could not stay me, being dead;
      Her body here was mine to hold.
      What if her lips had lost their red?
      To me they always tasted cold
              With the cold words she said.

      Did my breath run along her hair,
      And free the pulse, and fire the brain,
      My wild blood wake her wild blood there?
      Her eyelids lifted wide again
              In a blue, sudden stare.

      Beneath my fierce, profane caress
      The whole white length of body moved;
      The drowsy bosom seemed to press
      As if against a breast beloved,
              Then fail for weariness.

      No, not that anguish!    Christ forbid
      That I should raise such dead!    I rose,
      Stifled the mouth with lilies, hid
      Those eyes, and drew the long hair close,
              And shut the coffin lid.

      My cold brow on the cold wood laid,
      Quiet and close to-night we lie.
      No cruel words her lips have said.
      I shall not take nor she deny.
              The dead is with the dead.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Muriel Stuart",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Separation",
      content: `HE

      One decade and a half since first we came
      With hearts aflame
      Into Love's Paradise, as man and mate;
      And now we separate.
      Soon, all too soon,
      Waned the white splendour of our honeymoon.
           We saw it fading; but we did not know
           How bleak the path would be when once its glow
      Was wholly gone.
      And yet we two were forced to follow on -
           Leagues, leagues apart while ever side by side.
          Darker and darker grew the loveless weather,
      Darker the way,
      Until we could not stay
          Longer together.
           Now that all anger from our hearts has died,
      And love has flown far from its ruined nest,
      To find sweet shelter in another breast,
           Let us talk calmly of our past mistakes,
           And of our faults; if only for the sakes
      Of those with whom our futures will be cast.
           You shall speak first.
  
      SHE
  
      A woman would speak last -
           Tell me my first grave error as a wife.
  
      HE
  
           Inertia.    My young veins were rife
      With manhood's ardent blood; and love was fire
      Within me.    But you met my strong desire
           With lips like frozen rose leaves - chaste, so chaste
           That all your splendid beauty seemed but waste
      Of love's materials.    Then of that beauty
           Which had so pleased my sight
      You seemed to take no care; you felt no duty
           To keep yourself an object of delight
           For lover's-eyes; and appetite
      And indolence soon wrought
      Their devastating changes.    You were not
           The woman I had sworn to love and cherish.
      If love is starved, what can love do but perish?
      Now will you speak of my first fatal sin
           And all that followed, even as I have done?
  
      SHE
  
      I must begin
          With the young quarter of our honeymoon.
           You are but one
          Of countless men who take the priceless boon
      Of woman's love and kill it at the start,
          Not wantonly but blindly.    Woman's passion
      Is such a subtle thing - woof of her heart,
      Web of her spirit; and the body's part
           Is to play ever but the lesser role
           To her white soul.
          Seized in brute fashion,
      It fades like down on wings of butterflies;
      Then dies.
           So my love died.
           Next, on base Mammon's cross you nailed my pride,
           Making me ask for what was mine by right:
           Until, in my own sight,
           I seemed a helpless slave
           To whom the master gave
      A grudging dole.    Oh, yes, at times gifts showered
      Upon your chattel; but I was not dowered
           By generous love.    Hate never framed a curse
      Or placed a cruel ban
      That so crushed woman, as the law of man
           That makes her pensioner upon his purse.
      That necessary stuff called gold is such
      A cold, rude thing it needs the nicest touch
           Of thought and speech when it approaches love,
           Or it will prove the certain death thereof.
  
      HE
  
      Your words cut deep; 'tis time we separate.
  
      SHE
  
      Well, each goes wiser to a newer mate.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Ella Wheeler Wilcox",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "In Memoriam Mae Noblitt",
      content: `This is just a place:
      we go around, distanced,
      yearly in a star's
      
      atmosphere, turning
      daily into and out of
      direct light and
      
      slanting through the
      quadrant seasons: deep
      space begins at our
      
      heels, nearly rousing
      us loose: we look up
      or out so high, sight's
      
      silk almost draws us away:
      this is just a place:
      currents worry themselves
      
      coiled and free in airs
      and oceans: water picks
      up mineral shadow and
      
      plasm into billions of
      designs, frames: trees,
      grains, bacteria: but
      
      is love a reality we
      made here ourselves,
      and grief, did we design
      
      that, or do these,
      like currents, whine
      in and out among us merely
      
      as we arrive and go:
      this is just a place:
      the reality we agree with,
      
      that agrees with us,
      outbounding this, arrives
      to touch, joining with
      
      us from far away:
      our home which defines
      us is elsewhere but not
      
      so far away we have
      forgotten it:
      this is just a place.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "A. R. Ammons",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Winter",
      content: ` Clouded with snow
      The cold winds blow,
      And shrill on leafless bough
      The robin with its burning breast
      Alone sings now.
  
      The rayless sun,
      Day's journey done,
      Sheds its last ebbing light
      On fields in leagues of beauty spread
      Unearthly white.
  
      Thick draws the dark,
      And spark by spark,
      The frost-fires kindle, and soon
      Over that sea of frozen foam
      Floats the white moon.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Walter De La Mare",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Penitent",
      content: ` I mourn with thee and yet rejoice
      That thou shouldst sorrow so;
      With Angel choirs I join my voice
      To bless the sinner's woe.
  
      Though friends and kindred turn away
      And laugh thy grief to scorn,
      I hear the great Redeemer say
      'Blessed are ye that mourn'.
  
      Hold on thy course nor deem it strange
      That earthly cords are riven.
      Man may lament the wondrous change
      But 'There is joy in Heaven'!
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Anne Bronte",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Poetry Of A Root Crop",
      content: ` Underneath their eider-robe
      Russet swede and golden globe,
      Feathered carrot, burrowing deep,
      Steadfast wait in charmed sleep;
      Treasure-houses wherein lie,
      Locked by angels' alchemy,
      Milk and hair, and blood, and bone,
      Children of the barren stone;
      Children of the flaming Air,
      With his blue eye keen and bare,
      Spirit-peopled smiling down
      On frozen field and toiling town -
      Toiling town that will not heed
      God His voice for rage and greed;
      Frozen fields that surpliced lie,
      Gazing patient at the sky;
      Like some marble carven nun,
      With folded hands when work is done,
      Who mute upon her tomb doth pray,
      Till the resurrection day.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Charles Kingsley",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Lady's Second Song",
      content: `What sort of man is coming
      To lie between your feet?
      What matter, we are but women.
      Wash; make your body sweet;
      I have cupboards of dried fragrance.
      I can strew the sheet.
      i(The Lord have mercy upon us.)
      
      He shall love my soul as though
      Body were not at all,
      He shall love your body
      Untroubled by the soul,
      Love cram love's two divisions
      Yet keep his substance whole.
      i(The Lord have mercy upon us.)
      
      Soul must learn a love that is
      proper to my breast,
      Limbs a Love in common
      With every noble beast.
      If soul may look and body touch,
      Which is the more blest?
      i(The Lord have mercy upon us.)
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "William Butler Yeats",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The River",
      content: `I am a river flowing from God's sea
      Through devious ways. He mapped my course for me;
      I cannot change it; mine alone the toil
      To keep the waters free from grime and soil.
      The winding river ends where it began;
      And when my life has compassed its brief span
      I must return to that mysterious source.
      So let me gather daily on my course
      The perfume from the blossoms as I pass,
      Balm from the pines, and healing from the grass,
      And carry down my current as I go
      Not common stones but precious gems to show;
      And tears (the holy water from sad eyes)
      Back to God's sea, from which all rivers rise
      Let me convey, not blood from wounded hearts,
      Nor poison which the upas tree imparts.
      When over flowery vales I leap with joy,
      Let me not devastate them, nor destroy,
      But rather leave them fairer to the sight;
      Mine be the lot to comfort and delight.
      And if down awful chasms I needs must leap
      Let me not murmur at my lot, but sweep
      On bravely to the end without one fear,
      Knowing that He who planned my ways stands near.
      Love sent me forth, to Love I go again,
      For Love is all, and over all. Amen.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Ella Wheeler Wilcox",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "Song",
      content: `She loves thee, loves thee not!
      That, that is all, my heart.
      Why should she take a part
      In every selfish blot,
      In every greedy spot
      That now doth ache and smart
      Because she loves thee not--
      Not, not at all, poor heart!
  
      Thou art no such dove-cot
      Of virtues--no such chart
      Of highways, though the dart
      Of love be through thee shot!
      Why should she not love not
      Thee, poor, pinched, selfish heart?
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "George MacDonald",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "A Blown Rose.",
      content: `Lay but a finger on
      That pallid petal sweet,
      It trembles gray and wan
      Beneath the passing feet.

      But soft! blown rose, we know
      A merriment of bloom,
      A life of sturdy glow, -
      But no such dear perfume.

      As some good bard, whose page
      Of life with beauty's fraught,
      Grays on to ripe old age
      Sweet-mellowed through with thought.

      So when his hoary head
      Is wept into the tomb,
      The mind, which is not dead,
      Sheds round it rare perfume.
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Madison Julius Cawein",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
   {
      title: "The Broken Dish.",
      content: `What's life but full of care and doubt
      With all its fine humanities,
      With parasols we walk about,
      Long pigtails, and such vanities.
  
      We plant pomegranate trees and things,
      And go in gardens sporting,
      With toys and fans of peacocks' wings,
      To painted ladies courting.
  
      We gather flowers of every hue,
      And fish in boats for fishes,
      Build summer-houses painted blue, -
      But life's as frail as dishes!
  
      Walking about their groves of trees,
      Blue bridges and blue rivers,
      How little thought them two Chinese,
      They'd both be smashed to shivers!
      `,
      genres: ["Humanity", "Love", "Peace"],
      coverImg: "",
      originalAuthor: "Thomas Hood",
      publishedAt: new Date(),
      viewsCount: 0,
      likesCount: 0,
      status: "published",
   },
];

export default dummyPoems;

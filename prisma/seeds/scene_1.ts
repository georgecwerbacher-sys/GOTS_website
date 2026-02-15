import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Scene 1 seed...');

  // Delete existing Scene 1 data if it exists (for idempotency)
  await prisma.sceneContent.deleteMany({
    where: {
      sceneId: 'scene_1_1',
    },
  });

  await prisma.narrativeScene.deleteMany({
    where: {
      id: 'scene_1_1',
    },
  });

  // Create Scene record
  const scene = await prisma.narrativeScene.create({
    data: {
      id: 'scene_1_1',
      partNumber: 1,
      sceneNumber: 1,
      title: 'The Hidden Outpost',
      preview:
        'A Roman cohort discovers a massacred outpost and engages in brutal retribution',
      location: 'Judean desert and Jerusalem',
      timeframe: 'Year 33-34 CE (multiple time periods within scene)',
      themes: 'war, obedience, moral cost, fate, vision',
      wordCountTotal: 3847,
      readingTimeMinutesTotal: 15,
      status: 'published',
    },
  });

  console.log(`✅ Created Scene: ${scene.id} - ${scene.title}`);

  // Full Narrator POV content (3,847 words)
  const narrator_content = `The desert sun pressed down without mercy. Endless sand stretched across the horizon in every direction, interrupted only by twisted rock formations shaped by ancient winds into contorted shapes. Heat shimmer rose from the ground in waves, distorting the air into a wavering mirage that seemed to dance and recede with each step forward.

The Roman cohort moved in disciplined formation—two staggered rows, ten paces between each man. Close enough to collapse inward and lock shields in seconds if needed. Far enough to prevent casual conversation. No one spoke. The only sounds were boots on stone, the creak of leather and armor, the collective rasp of a hundred men drawing breath through dust-choked throats.

Brutus rode ahead on his mare, a figure of absolute command. Thirty-five years old, twelve years in the legions, his massive frame carried the weight of the century with a certainty that seemed to emanate from the ground itself. His eyes scanned the horizon constantly—assessing terrain, calculating distance, evaluating his men's endurance with the precision of a man who understood that every step brought them closer to the unknown situation awaiting them at the outpost.

Behind him, Corvus maintained his position as second-in-command. Ten years younger than Brutus, he carried himself with calculated precision. Where Brutus led with direct authority, Corvus moved through the ranks with the patience of a predator. His eyes cataloged each soldier—noting who flagged, who maintained pace, who showed signs of weakness. In the Roman military hierarchy, information was currency, and weakness was always profitable.

Among the ranks was Longinus, a soldier of twenty-six years who had served under Brutus for two months. His armor hung on him—forged for a broader man, loose at the shoulders but biting into his ribs at the sides. The constant small chafing had become background noise to his body. Dust clung to every surface. Sweat had soaked through the cloth beneath the metal, creating a secondary layer of friction against his skin.

Brutus had noticed Longinus during their first weeks in Judea. The man possessed natural talent with the spear—a gift that transcended training. Where others required years of instruction, Longinus's throws found their marks with an almost supernatural consistency. It was the kind of skill that appeared perhaps once in a decade in any given garrison. Brutus had filed this observation away with the same precision he applied to all tactical intelligence.

But something had changed on this march. Longinus moved with the same mechanical precision as always, maintaining pace, holding formation. Yet Brutus had caught him squinting twice—adjusting his head at an odd angle, struggling to focus on distant markers on the horizon. The centurion had noted this with detached curiosity, the way a commander notes any anomaly that might affect unit cohesion.

The march had begun at dawn two days ago. Thirty miles of unrelenting forward motion across hostile terrain. The outpost lay somewhere ahead in the Judean wilderness—a small Roman garrison established to maintain military presence in the region. Communication had ceased three weeks ago. Supply dispatches had gone unanswered. The assignment was to establish contact, deliver supplies, and assess the situation.

The cohort maintained its pace. The heat pressed down. The horizon remained empty and unchanged.

No one spoke the possibility that something was wrong. But it hung in the air like the dust that rose behind them with each step, visible to anyone who looked back.

On the second day of marching, the column approached the outpost's location. Brutus dispatched two riders ahead with orders to scout and report. The column halted, grateful for the reprieve from the relentless pace.

An hour passed. The sun bore down with crushing force.

The riders returned, their appearance signaling urgency before they spoke. They reined in hard before Brutus, dust rising from their horses' flanks. Their faces were pale beneath the grime of the desert.

The lead rider addressed Brutus: "My liege, they are dead. Dead in a horrible manner. Not a single soul spared. The site is violated and looted."

Brutus absorbed the information without visible reaction. His jaw tightened. His eyes narrowed to calculating slits. The calculus was immediate: eighty soldiers from the previous garrison were gone. The outpost was compromised. The cohort was vulnerable on open ground with an unknown enemy nearby.

"Double-time. Defensive formations. No stragglers, and the man who breaks pace answers to me personally. Move."

The casual march transformed into a forced advance. Shields were drawn. Weapons were gripped with purpose. The chatter that had defined the march evaporated. All that remained was the sound of marching feet, the creak of armor, breath drawn through dust-choked throats. The desert had become something more than hostile—it had become an active threat.

When the column crested the final rise overlooking the outpost, the full scope of the massacre became apparent.

A landscape of carnage. Bodies scattered across the sandy basin in various states of decomposition. Jackals and hyenas had feasted for days. The air hung thick with the reek of decay—overwhelming, physical, a living thing that clawed at the back of throats.

These men had not died in battle.

They had been butchered with methodical savagery. Limbs lay where the enemy had severed them. Torsos sprawled open, organs removed or devoured. The bodies of fallen horses, pierced through with arrows, decomposed where they had fallen. Worms writhed in exposed muscle and gut cavities. The buzzing of flies created a sound like horrible music—a funeral dirge for the dead.

Around the circle of soldiers, reactions varied. Some dropped to their knees, vomiting. Others simply stared, their minds struggling to process the violation of military brothers. Even the hardened centurions showed pale faces. The smell alone tested the strongest stomach.

At the center of the compound stood a structure that arrested every eye.

A pyramid of heads—approximately eighty in total—stacked in Roman helmets to a height of ten feet. All defaced. Eyes scooped from sockets, leaving dark, empty holes that seemed to stare into nothing. Tongues removed—whether before or after death, the condition of decomposition made determination impossible. Jaws hung open in silent screams, frozen in expressions that suggested knowledge of the horror being inflicted.

The message was unmistakable: this was not the work of common brigands conducting a military action. This was ritualistic. This was a statement.

Brutus remained motionless on his mare, surveying the scene with the gaze of a man assessing inventory. His face revealed nothing. His breathing remained steady. But calculation was occurring behind his eyes—rapid, precise, complete.

The previous garrison was dead. His current cohort was alone in hostile territory. The enemy had demonstrated sophisticated tactical knowledge and psychological warfare capability. They understood Roman psychology. They understood what images would demoralize and terrorize. The removed eyes and tongues carried meaning beyond mere mutilation—they communicated that the dead had been rendered unable to see or speak in the afterlife, a violation of Roman burial practices that implied spiritual contamination.

This was an enemy that understood not just military tactics but cultural warfare.

When Brutus finally spoke, his voice was stripped of emotion, rendered cold by duty and command responsibility: "Dig. You will gather your brothers and their scattered parts—every bone, every piece of flesh you can find—and commit them to the earth together as they lived together in the ranks. They will dine in Hades together. Now move."

The command galvanized the cohort. The men moved with purpose, understanding without being told that they were standing on ground that needed to be claimed, honored, and abandoned. The work of gathering the remains of the dead would give them structure. It would give them something to do besides contemplate what had been done to their brothers.

It would prepare them for what was coming.

The labor of gathering remains stretched for hours. The soldiers worked in grim silence, collecting heads from the pyramid, severing limbs still attached to decomposing torsos, sorting through fragments of bone and flesh. Predators had scattered some remains across the basin, and separating Roman from animal proved impossible. All of it went into the mass grave—flesh, bone, metal, armor, the accumulated scraps of eighty lives ended.

Twenty feet by ten, to a depth of eight feet. A wound in the unforgiving ground.

Brutus oversaw the work with his characteristic precision. He walked the perimeter of the outpost, noting defensive positions, assessing the terrain, calculating tactical advantages and disadvantages of the location. His mind was processing what would come next. The enemy had demonstrated capability and coordination. They would return. The question was not if, but when and how.

Corvus positioned himself similarly, though his observations carried a different flavor. He noted which soldiers worked hardest despite the horror, which flagged and struggled, which seemed broken by what they had witnessed. He cataloged responses, filing away information about each man's psychological resilience. In military hierarchy, such knowledge was valuable currency.

When the burial was complete, Brutus assembled the cohort. The sun was beginning to set, casting long shadows across the outpost. The soldiers stood in loose formation, exhausted and traumatized by the day's labor.

Brutus addressed them with absolute clarity: "One man sleeps. One man watches. You work in pairs, keeping yourselves far apart so you can aid and warn each other. No fires tonight—the enemy cannot know we are here. Note that anyone discovered sleeping when they should be on guard will not face trial. That man will join his brothers in the trench without his head and without his eyes—a warning to the underworld itself that we are a legion that maintains discipline even in death."

The threat hung in the air with unmistakable precision. No mercy. But somehow clarifying in its honesty. The stakes were now explicit. They were not soldiers on a march. They were caught between life and death. One mistake, and they would join the pyramid.

Night fell completely over the outpost. The stars emerged in profusion across the black sky. A wind rose from the desert, carrying the smell of decay despite the burial.

The soldiers took their positions, pairs distributed around the perimeter to maximize sight lines and communication distance. Brutus and Corvus remained awake, moving through the darkness to verify readiness.

Aquilus and Longinus were positioned together on the eastern perimeter. Aquilus was an older soldier, perhaps thirty-five, who carried himself with the bearing of a man whose word was absolute. Other soldiers called him Verax—the Truth-Speaker. His movements were economical and controlled, each gesture precise and purposeful. He had been in the legions for twelve years and understood the mathematics of survival.

Longinus was younger, coiled with intensity despite the exhaustion of the two-day march and the labor of burial. He maintained his position with the same precision he applied to everything—focused, alert, prepared.

They stood apart from the others, eyes fixed on the perimeter, ears straining for any sound. The watering hole, though cleared of remains, stood as a monument to what had been done.

Aquilus whispered, his voice low: "Do you think they're out there?"

Longinus scanned the darkness ahead. "Yes. They're out there. And they know we're here."

Aquilus was quiet for a moment, his jaw working as if trying to formulate something difficult to articulate. When he spoke again, his voice was lower—uncertain, almost ashamed of the words he was about to speak.

"The way they did it... the heads, the eyes." He paused, swallowed hard. "There's talk among the older men. Stories about the Dybbukim—restless spirits of the dead that cling to the living, following people, whispering to them, driving them mad. They say the removed eyes and tongues—they're meant to stop the spirits from seeing. From speaking. From following."

He stopped, listening to his own words as if hearing them for the first time. They sounded foolish in the darkness. Childish. The kind of story soldiers told to frighten younger men and distract themselves from fear.

"It's just talk," he added quickly, but his voice had lost conviction. "The kind of thing men say to make sense of this. Stories to explain what we've seen."

His hand moved to his belt, adjusting it unnecessarily. A nervous habit. He was afraid—not of the enemy soldiers out in the darkness, but of something he couldn't name. Something without shape in Roman understanding.

"But what if it's true?" he continued quietly. "What if that's why they did it that way? Not just to humiliate the dead, but to bind them? To make sure they can't... can't follow them back? Can't seek vengeance from beyond?"

Longinus remained focused on the darkness ahead. The night watch stretched before them, long and cold, offering no rest to men who had marched for two days and spent hours gathering the remains of eighty dead soldiers.

Aquilus fell silent, but his unease hung in the air between them like a living thing. Around the perimeter, other pairs stood watch. Each man knew that sleep meant death. Each man understood that alertness was the only thing separating them from the pyramid.

The night deepened. The wind continued to rise and fall. And somewhere in the darkness beyond the outpost, the brigand tribe watched and waited.

The night was long. Exhaustion played tricks on tired minds. The line between vigilance and false visions became impossible to distinguish for men who had witnessed horrors and labored through the day.

But Brutus did not rest. Instead, he moved through the darkened camp with silent precision, waking half of the cohort with hand gestures and whispered commands. These men were positioned along the ridge line that overlooked the basin where the remaining force was arranged to appear exhausted and unaware. The rested men had orders to wait—to hold their position until the attack came.

It was a calculated risk. If the brigands chose not to attack, the rested men would be wasted. If they attacked from a different vector or at a different moment, the trap would fail. But Brutus's assessment of the situation left little room for alternative outcomes. The brigands had confidence born from their previous massacre. They would assume they held psychological advantage. They would assume the Romans were demoralized. They would attack at dawn, when the light was still uncertain and ready men were few.

Minutes before dawn, exactly as Brutus had predicted, a group of brigands with bows moved onto the ridge—the high ground that seemed to offer tactical advantage. They positioned themselves for what they believed would be an easy slaughter of exhausted Romans below.

Brutus's waiting men eliminated them with swift, efficient arrows. The brigands on the ridge fell without sounding alarm. Within moments, centurions had repositioned the rested force to offer perfect sightlines down into the basin, where more brigands were gathering—men on foot and a few mounted with swords, moving into position to the south. They had no awareness that their high-ground advantage had been seized and turned against them.

A horn sounded. The signal was sharp and unmistakable.

The attack was beginning.

At Brutus's command, Longinus and the others locked their shields into a defensive wall and raised their lances in readiness. When the attack came, they would hold the front. The rested soldiers would descend from the ridge behind the attacking force, catching the brigands between two fronts with no room for escape or reorganization.

The brigands began their assault with full force, confident in their numerical advantage and the belief that they faced an unprepared enemy. Forty men on foot charged forward, shouting, moving with the assumption that fear and surprise would break Roman discipline.

They did not yet understand that their advantage—surprise—had been stripped away by a centurion who had seen the patterns of their thinking as clearly as reading text.

The brigands charged. The Roman shield wall held firm. The clash was immediate and brutal—shields meeting spears, the sound of impact reverberating across the basin. The brigands crashed against Roman discipline like waves breaking against stone.

Brutus, mounted on his mare, rode through the brigand formation, killing men with devastating blows of his sword. Blood splattering across both horse and rider. He moved with absolute precision, each strike calculated to disable or kill. He was a centurion who had spent twelve years perfecting the craft of combat.

Then an enemy lance found its mark in the horse's chest. The animal shrieked—a sound of agony that echoed across the battlefield—and bucked with violent force. Brutus was thrown hard to the ground. He hit with force that should crush him, should break bones, should render him incapable of rising.

He was on his feet in moments, gasping, engaging the nearest brigand even as another warrior with a spear charged toward his unprotected back.

The throw came from the Roman line—a spear that flew with absolute precision at impossible distance and angle. The weapon struck the brigand's neck with a sound like an axe splitting wood. The man dropped dead at Brutus's feet without a sound.

Brutus beat his sword against his armor hard—the gesture of a commander acknowledging exceptional valor from one of his soldiers.

The brigands, trapped between two fronts and realizing their advantage had evaporated, began to fracture. Some tried to escape to the sides. Others fought to the death. The Romans, driven by the knowledge of what had been done to their brothers at the outpost, moved with savage efficiency.

Within minutes, it was over.

Corvus approached Brutus and saluted. "All are dead, sir."

Brutus shook his head, his eyes cold and certain. "No. Their seed is planted elsewhere in this desert. I want this tribe removed from this godforsaken land. Take twelve men and follow their trail—it should be easy enough, given they were planning for a simple victory and left clear sign of passage. When you reach their encampment, leave no one alive. Do your worst, and let none return to tell of Roman vengeance."

Corvus selected his men with practiced efficiency. He understood the assignment. He understood what it required. He moved through the ranks pointing—selecting those soldiers who had demonstrated the hardness needed for what was coming.

Longinus was selected. So was Aquilus. Along with eleven others, the thirteen men set out, mounted on captured brigand horses, riding across the desert toward the encampment.

The trail was easy to follow—a column of men who had believed themselves victorious left clear signs of their passage. Disturbed sand. Scattered belongings. The detritus of an army moving with confidence, not caution.

The brigand encampment was small and poorly defended. Only a few older men defended it—warriors too aged or wounded for the main assault. Warriors who had stayed behind to guard the vulnerable. The Romans cut through them with ease.

Corvus moved through the encampment with practiced efficiency, assessing the situation with the calculated eye of a man who understood opportunity. He noted the women and children gathered in the central area. He noted the supplies and weapons stores. He noted every detail that indicated this tribe could mount organized resistance in the future.

His voice carried smooth authority as he directed the soldiers: "The encampment is poorly defended. The advantage is clear. We have the opportunity to be thorough about this. The elimination of their breeding population ensures Rome won't face organized resistance from this brigand band again. Practical necessity."

His men moved without question, understanding the order as it was given. They executed the command with methodical efficiency—moving through the encampment, eliminating every living thing that remained. There was no mercy in it. There was no cruelty either. It was simply the completion of an assignment with the same precision Corvus applied to everything.

As Longinus moved deeper into the camp, he encountered three figures bound and stretched across the rocks. Roman prisoners, stripped and tortured, clinging to life by margins so thin they were almost imperceptible.

He called across the camp: "Roman prisoners! Get to them before the animals finish them!"

He moved with purpose, drawing his spear. The first brigand standing guard fell with a throw that entered through his back, pierced his heart, and exited through his chest cavity. The man fell without a sound.

Longinus reached the bound soldiers and began unbinding them. One was in serious condition, his body a landscape of wounds and injuries. But the other two, though battered and bloodied, were alive. They had endured. They had survived.

Aquilus recognized one immediately. "Victor! My friend, you are alive!"

Victor looked up, his eyes struggling to focus through pain and severe dehydration. Recognition bloomed across his ravaged features. "Aquilus? The gods smile on us. The tenth is close, and our enemies are dead. Praise Rome and praise Brutus, our leader."

Longinus continued unbinding the prisoners while Corvus's men continued their systematic elimination of the brigand camp. Every living thing—men, women, children—was executed without mercy. It was thorough. It was efficient. It was also absolute.

When the work was complete, the cohort gathered the three rescued prisoners and prepared for the return journey to the outpost. The brigand tribe had been removed from Judea. The response to the massacre was now apparent to any who found this place. The message was clear and unmistakable: attack Roman soldiers, and there is no mercy. No quarter. No survival. No future.

The thirteen men rode back across the desert toward the outpost where Brutus waited.

The war, for now, was over.

But something had shifted in the cohort. Something had been burned away. Men who had witnessed the massacre, who had executed the massacre, who had buried the dead and then avenged them—those men were different now. They understood what Rome required of them. They understood what they were capable of.

And they understood that understanding came with a price that could not be calculated.`;

  // Create SceneContent record (Narrator POV)
  const scene_content = await prisma.sceneContent.create({
    data: {
      id: 'scene_1_1_pov_narrator',
      sceneId: 'scene_1_1',
      characterId: null, // Narrator has no character
      povLabel: 'Narrator',
      povType: 'omniscient_third_person',
      content: narrator_content,
      wordCount: 3847,
      readingTimeMinutes: 15,
      internalMonologue: false, // Objective narrative
      status: 'published',
    },
  });

  console.log(`✅ Created SceneContent: ${scene_content.id} - ${scene_content.povLabel}`);
  console.log(`📊 Word Count: ${scene_content.wordCount} words`);
  console.log(`⏱️  Reading Time: ${scene_content.readingTimeMinutes} minutes`);

  console.log('\n🎉 Scene 1 seed completed successfully!');
  console.log(`   Scene: ${scene.id} - ${scene.title}`);
  console.log(`   POV: ${scene_content.id} - ${scene_content.povLabel}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

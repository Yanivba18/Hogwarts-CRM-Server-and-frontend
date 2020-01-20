class Student:
    def __init__(self, id, first_name, last_name, creation_time, last_updated, magic_skills, desired_magic_skills, courses):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.creation_time = creation_time
        self.last_updated = last_updated
        self.magic_skills = magic_skills
        self.desired_magic_skills = desired_magic_skills
        self.courses = courses



skills_enum = [
    "Alchemy",
    "Animation",
    "Conjuror",
    "Disintegration",
    "Elemental",
    "Healing",
    "Illusion",
    "Immortality",
    "Invisibility",
    "Invulnerability",
    "Necromancer",
    "Omnipresent",
    "Omniscient",
    "Poison",
    "Possession",
    "Self-detonation",
    "Summoning",
    "Water breathing"
]

courses_enum = [
    "Alchemy basics",
    "Alchemy advanced",
    "Magic for day-to-day life",
    "Magic for medical professionals",
    "Dating with magic",
]

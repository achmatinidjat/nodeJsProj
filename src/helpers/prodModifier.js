class ProdModifier {

    async modify(courses, title) {

        for (let cours of courses) {

            cours.dataValues["Name"] = await title.countMarks(cours.id);

            let tags = await cours.getTags();

            cours.dataValues.tags = [];

            for (let tag of tags) {

                cours.dataValues.tags.push(tag.name);

            }

        }
    }

}

module.exports = new ProdModifier();
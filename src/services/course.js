const course = require("../repository/course");
const Mark = require("../repository/mark");
const markService = require("./mark");
const Tag = require("../repository/tag");
const courseTag = require("../repository/courseTag");
const modifier = require("../helpers/prodModifier");

class courseService {

    async create(course) {

        return await course.create(course);

    }

    read(courseId) {

        return course.read(courseId);

    }

    async searchByTags(tags){

        const tagIds = [];

        for (let tagName in tags){

            let tag = await Tag.readByName(tags[tagName]);

            tagIds.push(tag.id);

        }

        const relations = await courseTag.getcoursesWithTag(tagIds);
        let courseIds = [];

        for (let relation of relations) {

            courseIds.push(relation.dataValues.course_id);

        }

        courseIds = new Set(courseIds);

        courseIds = [...courseIds];

        let courses = await course.readSome(courseIds);

        await modifier.modify(courses, Mark);

        return courses;

    }

    async searchByName(name) {

        let courses = await course.searchByName(name);

        await modifier.modify(courses, Mark);

        return courses;

    }

    async addTag(courseId, tagName) {

        let tag = await Tag.readByName(tagName);

        if(!tag){

            tag = await Tag.create(tagName);

        }

        if(await courseTag.read(courseId, tag.id)){

            throw new NotAcceptableError("course already has this tag")

        }

        return courseTag.create(courseId, tag.id);

    }

    deleteTag(courseId, tagName) {

        const tag = Tag.readByName(tagName);

        if(!tag) {

            throw new NotAcceptableError("Tag doesn't exists");

        }

        return courseTag.delete(courseId, tag.id);

    }

    async listTags(courseId) {

        const course = await course.read(courseId);

        return course.getTags();

    }

    async update(id, courseData) {

        return await course.update(id, courseData);

    }

    async delete(id) {

        return await course.delete(id);

    }

    async list(params) {

        const courses = await course.list(params);

        await modifier.modify(courses, Mark);

        return courses;

    }

    async setMark(userId, courseId, markValue) {

        if (await Mark.find(userId, courseId)) {

            await Mark.update(userId, courseId, markValue);

        } else {

            await Mark.create(userId, courseId, markValue);

        }

        return await course.update(
            courseId,

            {
                mark: await markService.calculateTotalMark(courseId)
            }
        );

    }

    async deleteMark(userId, courseId) {

        await Mark.delete(userId, courseId);

        await course.update(
            courseId,

            {
                mark: await markService.calculateTotalMark(courseId)
            }
        );

    }
}

module.exports = new courseService();

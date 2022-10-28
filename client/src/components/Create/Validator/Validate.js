let noEmpty = /\S+/;
let validateName = /^[a-zA-Z\s]+$/;
let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

export default function validate(input) {
    let errors = {};

    if (!noEmpty.test(input.name) || input.name.length < 3 || !validateName.test(input.name)) {
        errors.name = "The name must have more than two characters. Must not contain numbers and special characters";
    } else if (input.rating < 1 || input.rating > 10) {
        errors.rating = "Your must rate your videogame. Between 1-10";
    } else if (!input.released || input.released < "1950 - 01 - 01") {
        errors.released = "The date cannot be less than 1950 - 01 - 01";
    } else if (!input.description || input.description.length < 20) {
        errors.description = "Your videogame must have a description. Minimum 20 characters";
    } else if (input.image && !validateUrl.test(input.image)) {
        errors.image = "This is not a valid URL";
    } else if (!input.platforms.length) {
        errors.platforms = "Select one or more platforms";
    } else if (!input.genres.length) {
        errors.genres = "Select at least one Genre";
    }
    return errors;
};

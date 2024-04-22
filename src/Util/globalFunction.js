const validateParams = async (schema, params) =>{
    try {
        // Validate the parameters against the schema
        await schema.validate(params);
        // If validation passes, return null indicating no errors
        return null;
      } catch (error) {
        // If validation fails, return the validation errors
        return error.errors;
      }
}

module.exports = { validateParams }
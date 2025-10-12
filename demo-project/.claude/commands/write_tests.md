Generate comprehensive tests for: $ARGUMENTS

Create test cases that cover:

1. **Happy Path Testing**
   - Test all functions with valid inputs
   - Verify expected outputs
   - Test default parameters

2. **Edge Cases**
   - Empty strings
   - Null and undefined values
   - Very long inputs
   - Special characters
   - Boundary values

3. **Error Handling**
   - Invalid input types
   - Missing required parameters
   - Out-of-range values
   - Validation failures

4. **Integration Testing**
   - Test functions working together
   - Test data flow between functions
   - Test state changes

Test Requirements:
- Use Node.js built-in `assert` module
- Include descriptive test names
- Add comments explaining what each test verifies
- Group related tests together
- Follow the existing test file format in `tests/task.test.js`

Output the complete test file with:
- Clear test descriptions
- Comprehensive coverage
- Easy-to-understand assertions
- Helpful error messages

describe(" Qoutes App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234");
    })

const textInput = () => cy.get("input[name=text]");
const authorInput = () => cy.get("input[name=author]");
const foobarInput = () => cy.get("input[name=foobar]");
const submitBtn = () => cy.get(`button[id="submitBtn"]`);
const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

it("sanity check to make sure tests work", () => {
    expect(1+2).to.equal(3);
    expect(2+2).not.equal(5);
})

it("the proper elements are showing", () => {
    textInput().should("exist");
    authorInput().should("exist");
    foobarInput().should("not.exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");

    cy.contains("Submit Quote").should("exist");
    cy.contains(/submit quote/i).should("exist");
})

describe("Filling out the inputs and cancelling", () => {
    it("can navigate to the site", () => {
        cy.url().should("include", "localhost");
    })

    it("submit button starts out disabled", () => {
        submitBtn().should("be.disabled")
    })

    it("can type in the inputs", () => {
        textInput()
            .should("have.value", "")
            .type("CSS rulez")
            .should("have.value", "CSS rulez");

        authorInput()
            .should("have.value", "")
            .type("CRHarding")
            .should("have.value", "CRHarding");
    })

    it("the submit enables when both inputs are filled out", () => {
        authorInput().type("Casey");
        textInput().type("This is fun!");
        submitBtn().should("not.be.disabled");
    })

    it("the cancel button can reset the inputs and disable the submit button", () => {
        authorInput().type("Casey");
        textInput().type("FUN");
        cancelBtn().click();
        textInput().should("have.value", "");
        authorInput().should("have.value", "");
        submitBtn().should("be.disabled");
    })
})

describe("Adding a new qoute", () => {
    it("can submit and delete a new qoute", () => {
        textInput().type("CSS rulez");
        authorInput().type("CRHarding");
        submitBtn().click();

        cy.contains("CSS rulez").siblings("button:nth-of-type(2)").click();
        cy.contains("CSS rulez").should("not.exist");
    })

    it("variation of can submit a new qoute", () => {
        cy.contains("CSS rulez").should("not.exist");
        textInput().type("CSS rulez");
        authorInput().type("Casey");
        submitBtn().click();
        cy.contains("CSS rulez");
        cy.contains("Casey");
        cy.contains("CSS rulez").next().next().click();
        cy.contains("CSS rulez").should("not.exist");
    })
})

    describe("Editing an existing qoute", () => {
        it("can edit a qoute", () => {
            textInput().type("Lorem Ipsum");
            authorInput().type("CRHarding");
            submitBtn().click();
            cy.contains("Lorem Ipsum").siblings("button:nth-of-type(1").click();
            textInput().should("have.value", "Lorem Ipsum");
            authorInput().should("have.value", "CRHarding");
            textInput().type("dolor sit");
            authorInput().type("rocks!");
            submitBtn().click();
            cy.contains("Lorem Ipsum dolor sit (CRHarding rocks!)");
            cy.contains("Lorem Ipsum dolor sit (CRHarding rocks!)").next().next().click();
            cy.contains("Lorem Ipsum dolor sit (CRHarding rocks!)").should("not.exist");

        })
    })
})

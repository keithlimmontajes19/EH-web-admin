export const blanks = {
  singleChoice: {
    contentType: "question",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: undefined,
      choices: ["", ""],
    },
    questionType: "single-choice",
    createdAt: new Date().getTime(),
  },
  multipleChoice: {
    contentType: "question",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: [],
      choices: [""],
    },
    questionType: "multiple-choice",
    createdAt: new Date().getTime(),
  },
  essay: {
    contentType: "question",
    resource: { points: 1 },
    title: "",
    description: "",
    questionType: "essay",
    createdAt: new Date().getTime(),
  },
  sort: {
    contentType: "question",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: ["", ""],
    },
    questionType: "sorting",
    createdAt: new Date().getTime(),
  },
  fillBlanks: {
    contentType: "question",
    title: "",
    description: "",
    body: `
        &lt;html&gt; 
          &lt;body&gt; 
            &lt;h4&gt;&lt;/h4&gt;
            &lt;p&gt;&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;`,
    resource: {
      points: 1,
      answer: [],
    },
    questionType: "fill-in-the-blanks",
    createdAt: new Date().getTime(),
  },
};

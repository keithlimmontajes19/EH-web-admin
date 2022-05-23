export const blanks = {
  singleChoice: {
    contentType: "question",
    questionType: "single-choice",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: undefined,
      choices: ["", ""],
    }
  },
  multipleChoice: {
    contentType: "question",
    questionType: "multiple-choice",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: [],
      choices: [""],
    }
  },
  essay: {
    contentType: "question",
    questionType: "essay",
    title: "",
    description: "",
    resource: { points: 1 }
  },
  sort: {
    contentType: "question",
    questionType: "sorting",
    title: "",
    description: "",
    resource: {
      points: 1,
      answer: ["", ""],
    }
  },
  fillBlanks: {
    contentType: "question",
    questionType: "fill-in-the-blanks",
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
    }
  },
  quiz: {
    contentType: 'quiz',
    title: '',
    description: '',
    preview: {type: 'image'},
    questions: [],
    isNew: true
  }
};

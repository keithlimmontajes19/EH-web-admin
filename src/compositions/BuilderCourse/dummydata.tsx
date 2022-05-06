const items = (name) => ({
  "_id": {
      "$oid": "6266fedddbc299753a48999d"
  },
  "course":{"$oid":"624af9c783adf50b10c6dad6"},
  "contentType":"section-head",
  "title":name,
  "preview":{"type":"image"},
  "ref":{"$oid":"6261527da0804dd715823406"},
  "curriculum":[
    {
      "title":"Sub-ftr31-Course001Updated",
      "preview":{"type":"image",
      "ref":{"$oid":"6261527da0804dd715823406"}},
      "instructor":{"name":"Foo","title":"Doctor"},
      "contentType":"lesson",
      "createdBy":{"$oid":"62344fb331cfc6e274ab4f63"},
      "contents":[{"title": "first-topic", "contentType": "topic"},{"title": "2-topic", "contentType": "topic"},{"title": "quiz", "contentType": "quiz"}],
      "createdAt":{"$date":{"$numberLong":"1649080776008"}},
      "updatedAt":{"$date":{"$numberLong":"1650010235506"}},
      "description":"Course001Description",
      "body":"&lt;html&gt;&lt;body&gt;&lt;p&gt;Course001Description&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"
    },
    {
      "title":"dummy-Section-Head",
      "preview":{"type":"image"},
      "ref":{"$oid":"6261527da0804dd715823406"},
      "contentType":"section-head",
      "instructor":{"name":"Foo","title":"Doctor"},
      "createdBy":{"$oid":"62344fb331cfc6e274ab4f63"},
      "curriculum":[
        {
          "title":"Sub-ftr31-Course001Updated",
          "preview":{"type":"image"},
          "ref":{"$oid":"6261527da0804dd715823406"},
          "instructor":{"name":"Foo","title":"Doctor"},
          "contentType":"lesson",
          "createdBy":{"$oid":"62344fb331cfc6e274ab4f63"},
          "contents":[{"title": "second-topic", "contentType": "topic"}],
          "createdAt":{"$date":{"$numberLong":"1649080776008"}},
          "updatedAt":{"$date":{"$numberLong":"1650010235506"}},
          "description":"Course001Description",
          "body":"&lt;html&gt;&lt;body&gt;&lt;p&gt;Course001Description&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"
        }
      ],
      "createdAt":{"$date":{"$numberLong":"1649080776008"}},
      "updatedAt":{"$date":{"$numberLong":"1650010235506"}},
      "description":"Sub-SEcaet0j-y4wy",
      "body":"&lt;html&gt;&lt;body&gt;&lt;p&gt;Course001Description&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"
    }
  ],
  "createdAt":{"$date":{"$numberLong":"1649080792121"}},
  "updatedAt":{"$date":{"$numberLong":"1650384125498"}},
  "description":"Lesson001Description",
  "body":"&lt;html&gt;&lt;body&gt;&lt;p&gt;Lesson001Description&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;",
  "position":{"$numberInt":"1"}
})

export const dummyData = [
	{
		"_id": {
			"$oid": "626703fcdbc299753a48999e"
		},
		"title":"Course001Updated",
		"preview":{"type":"image"},
		"ref":{"$oid":"6261527da0804dd715823406"},
		"instructor":{"name":"Foo","title":"Doctor"},
		"createdBy":{"$oid":"62344fb331cfc6e274ab4f63"},
		"curriculum":[items('dummy-data'), items('dummy-data-copy')],
		"createdAt":{"$date":{"$numberLong":"1649080776008"}},
		"updatedAt":{"$date":{"$numberLong":"1650010235506"}},
		"description":"Course001Description",
		"body":"&lt;html&gt;&lt;body&gt;&lt;p&gt;Course001Description&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"
	}
]
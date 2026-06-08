fetch(

"/data/related-topics.json"

)

.then(

response => response.json()

)

.then(

related => {

    showRelatedTopics(

        related[currentTopic]

    );

}

);

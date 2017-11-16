const submit = $("#submit-button");
const query = $("#query");
const results = $("#results");


function getBook(){
	let queryVal = query.val();

	$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + queryVal,
		type: "GET",
		dataType: "JSON",
		success: function(data){
			let bookResults = data.items;
			results.html("");

			$.each(bookResults, function(index, value){
				console.log(bookResults);
				
				let title = value.volumeInfo.title;

				title.length > 20 ? title = (title.slice(0, 17) + "...") : title = title;
				let info = value.volumeInfo.description;
				let authorsArr = value.volumeInfo.authors;
				let authors = authorsArr.join(", ");
				let imageLink = value.volumeInfo.imageLinks.thumbnail;















				
				let bookHTML =  `
					<div class="col-12 col-sm-6 col-md-4 tile">
						<div class="book-container card">
							<img src="${imageLink}" alt="" class="book-img">
							<div class="card-block text-center">
								<h2 class="book-title">${title}</h2>
								<p class="book-info">${authors}</p>
								<button class="btn btn-primary book-button">More Info</button>
							</div>	
						</div>
					</div>
				`;

				$('#results').append(bookHTML);
			});		
		}
	})
}

submit.click(function(){
	getBook();
	query.val("");
});


query.on('keyup', function (e) {
    if (e.keyCode == 13) {
        getBook();
        query.val("");
    }
});
//className is used in JSX for class attribute
var fooDiv = React.createElement("h1", null, "Hello my friend");
// Render where div#example is our placeholder for insertion
ReactDOM.render(fooDiv, document.getElementById('container')); 
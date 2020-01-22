const cors = require("cors"),
	express = require("express"),
	{ graphqlDBConn, onConn } = require("./db/mongoose"),
	schema = require("./graphql/schema/schema"),
	graphqlHttp = require("express-graphql"),
	compression = require("compression"),
	bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(compression());

graphqlDBConn;
onConn;

const port = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

app.use(
	"/graphql",
	graphqlHttp({
		schema,
		graphiql: true
	})
);

app.listen(port, () => console.log(`Server started on ${port}`));

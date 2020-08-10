const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '747d5ebd83c34e18b8afd83c44ee4b80'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to call Clarifai API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
const questions = [
	{
		id: 1,
		question: 'Which HTML element is used for the largest heading?',
		options: ['<head>', '<h6>', '<h1>', '<header>'],
		correctAnswer: 2,
		hint: 'Which tag indicates the top-level heading?',
		explanation: 'The <h1> tag represents the highest-level (largest) heading in HTML.'
	},
	{
		id: 2,
		question: 'What is the output of: console.log(typeof NaN)?',
		options: ['"number"', '"NaN"', '"undefined"', '"object"'],
		correctAnswer: 0,
		hint: 'NaN is a special numeric value in JavaScript.',
		explanation: 'In JavaScript, NaN is considered a number, so typeof NaN returns "number".'
	},
	{
		id: 3,
		question: 'Which CSS property is used to change the text color?',
		options: ['font-style', 'color', 'text-color', 'font-color'],
		correctAnswer: 1,
		hint: 'It is a simple property named after what it changes.',
		explanation: 'The CSS `color` property sets the color of text.'
	},
	{
		id: 4,
		question: 'What is the next number in the sequence: 2, 4, 8, 16, ...?',
		options: ['18', '20', '32', '24'],
		correctAnswer: 2,
		hint: 'Each term is multiplied by the same factor.',
		explanation: 'This sequence doubles each term: 16 * 2 = 32.'
	},
	{
		id: 5,
		question: 'Which HTTP status code indicates a resource was not found?',
		options: ['200', '301', '404', '500'],
		correctAnswer: 2,
		hint: 'It is commonly shown as "Not Found".',
		explanation: 'HTTP 404 means "Not Found" — the server can’t find the requested resource.'
	},
	{
		id: 6,
		question: 'In Git, which command creates a new branch and switches to it?',
		options: [
			'git branch new-branch',
			'git checkout -b new-branch',
			'git switch -c new-branch',
			'Both B and C'
		],
		correctAnswer: 3,
		hint: 'There are multiple commands that can both create and switch branches.',
		explanation: 'Both `git checkout -b <name>` and `git switch -c <name>` create and switch to a new branch.'
	}
];

export default questions;
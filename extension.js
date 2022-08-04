// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "region-dash" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('region-dash.helloWorld', function () {
	let disposable = vscode.commands.registerTextEditorCommand('region-dash.helloWorld', function (currentEditor, edit) {

		// The code you place here will be executed every time your command is executed
		let text = currentEditor.document.lineAt(currentEditor.selection.active.line);

		const activeEditor = vscode.window.activeTextEditor
		if (activeEditor) {
			const lineOffset = activeEditor.selection.active.line
			const charOffset = activeEditor.selection.active.character
			let columnOffset = (getColumn(activeEditor.document.lineAt(lineOffset).text, charOffset)) + 1;

			console.log(`line: ${lineOffset + 1}`)
			console.log(`character: ${charOffset + 1}`)
			console.log(`column: ${getColumn(activeEditor.document.lineAt(lineOffset).text,charOffset) + 1}`) //column

			let dashNum = 150 - columnOffset;

			var dashes = "-"


			for (var i = 0; i < dashNum; i++) {
				dashes = dashes + "-"
			};

			//insert dashNum amount of - at curser position
			edit.insert(activeEditor.selection.active, dashes)

			function getColumn(str, sumCharacter) {
				const arr = [...str]
				let whichCharacter = 0
				for (let whichColumn = 0; whichColumn < arr.length; whichColumn++) {
					if (whichCharacter===sumCharacter) {
						return whichColumn
					}
					whichCharacter+=arr[whichColumn].length
				}
				return arr.length
			}
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from region-dash!');
		console.log(text);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

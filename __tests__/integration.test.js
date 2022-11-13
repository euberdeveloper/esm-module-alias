const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

describe('Integration tests', function () {
    const sampleProjectsPath = path.join(__dirname, 'sample-projects');
    const sampleProjectsRoots = fs.readdirSync(sampleProjectsPath).map(dirName => path.join(sampleProjectsPath, dirName));

    const customErrorMessageTemplate = fs.readFileSync(path.join(__dirname, 'assets', 'custom-error-message.template.txt'), 'utf-8');

    for (const sampleProjectPath of sampleProjectsRoots) {
        const baseName = path.basename(sampleProjectPath);
        it(`Test sample project ${baseName}`, function () {
            const { code, stdout, stderr } = shell.exec('npm test', {
                cwd: sampleProjectPath
            });

            const errorMessage = customErrorMessageTemplate
                .replace(/{{CODE}}/g, code)
                .replace(/{{STDOUT}}/g, stdout)
                .replace(/{{STDERR}}/g, stderr);

            expect(code, errorMessage).toEqual(0);
        });
    }
});
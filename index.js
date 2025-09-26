const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const aptUpdateCmd = core.getInput('APT_UPDATE_CMD');
    const aptInstallCmd = core.getInput('APT_INSTALL_MAVEN_CMD');
    const projectDir = core.getInput('PROJECT_DIR');
    const mavenGoal = core.getInput('MAVEN_GOAL');

    // Update apt
    await exec.exec(aptUpdateCmd);

    // Install Maven
    await exec.exec(aptInstallCmd);

    // Run Maven goal
    await exec.exec(`mvn ${mavenGoal}`, [], { cwd: projectDir });

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();


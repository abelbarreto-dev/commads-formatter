const makeCommitMessage = (select_type, commit_message) => {
    return `${select_type} ${commit_message}`;
};


const manager = () => {
    const params = {
        "select_tag": document.getElementById("select-tag").value,
        "select_type": document.getElementById("select-type").value,
        "commit_length": document.getElementById("commit-length").value,
        "commit_message": document.getElementById("commit-message").value
    };

    const commitMessage = makeCommitMessage(params.select_type, params.commit_message);

    if (10 > commitMessage.length || commitMessage.length > params.commit_length ) {
        alert("Lengths are not compatible at the range of 10 ... 72");
        return;
    }

    return `git commit ${params.select_tag} "${commitMessage}"`
};

document.getElementById("formGitFormatter").
addEventListener("submit", (event) => {
    event.preventDefault();

    const commit = manager();

    if (!commit) {return;}

    document.getElementById("commit-result").value = commit;

    navigator.clipboard.writeText(commit).then();
});

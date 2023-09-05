const makeBranchMessage = (select_type, branch_phrase) => {
    branch_phrase = branch_phrase.replaceAll(" ", "-");

    return `${select_type}${branch_phrase}`;
};


const branch_manager = () => {
    const params = {
        "select_type": document.getElementById("select-type-branch").value,
        "branch_length": document.getElementById("branch-length").value,
        "branch_phrase": document.getElementById("branch-phrase").value
    };

    const branchPhrase = makeBranchMessage(params.select_type, params.branch_phrase);

    if (10 > branchPhrase.length || branchPhrase.length > params.branch_length ) {
        alert("Lengths are not compatible at the range of 10 ... 72");
        return;
    }

    let phrase = branchPhrase.replace("/", ": ");
    phrase = phrase.replaceAll("-", " ");

    return {
        "branch": `git branch ${branchPhrase}`,
        "rename": `git branch -m ${branchPhrase}`,
        "checkout": `git checkout ${branchPhrase}`,
        "phrase": phrase
    }
};


document.getElementById("formGitBranch").
addEventListener("submit", (event) => {
    event.preventDefault();

    const branch = branch_manager();

    if (!branch) {return;}

    document.getElementById("branch-result").value = branch.branch;
    document.getElementById("branch-rename").value = branch.rename;
    document.getElementById("branch-checkout").value = branch.checkout;
    document.getElementById("branch-result-phrase").value = branch.phrase;

    switch (event.submitter.name) {
        case ("btn-branch"): {
            navigator.clipboard.writeText(branch.branch).then();
            break;
        }
        case ("btn-rename"): {
            navigator.clipboard.writeText(branch.rename).then();
            break;
        }
        case ("btn-checkout"): {
            navigator.clipboard.writeText(branch.checkout).then();
            break;
        }
        case ("btn-phrase"): {
            navigator.clipboard.writeText(branch.phrase).then();
            break;
        }
    }
});

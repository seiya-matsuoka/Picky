document.addEventListener("DOMContentLoaded", () => {

    // 所属チームの追加・削除
    let careerIndex = document.querySelectorAll(".addedcareer").length + 1;

    document.querySelector("#add-career-btn").addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add(`career-entry${careerIndex}`);
        newEntry.innerHTML = `                            
                    <div class="text-center">↑</div>
                    <div class="input-group">
                        <label class="input-group-text" for="career${careerIndex}">${careerIndex + 1}</label>
                        <input class="form-control rounded-end" type="text" name="player[career][${careerIndex}]" id="career${careerIndex}" required>                                
                        <div class="valid-feedback">
                            OK!
                        </div>
                    </div>
`;
        document.querySelector("#career-container").appendChild(newEntry);
        careerIndex++;
    });
    document.querySelector("#remove-career-btn").addEventListener("click", () => {
        document.querySelector(`.career-entry${careerIndex - 1}`).remove();
        careerIndex--;
    });

    // 実績の追加・削除
    let recordIndex = document.querySelectorAll(".addedrecord").length + 1;

    document.querySelector("#add-record-btn").addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add(`record-entry${recordIndex}`);
        newEntry.innerHTML = `                                      
                    <div class="input-group mt-3">
                        <label class="input-group-text" for="record${recordIndex}">${recordIndex + 1}</label>
                        <input class="form-control rounded-end" type="text" name="player[record][${recordIndex}]" id="record${recordIndex}" required>                                
                        <div class="valid-feedback">
                            OK!
                        </div>
                    </div>
`;
        document.querySelector("#record-container").appendChild(newEntry);
        recordIndex++;
    });
    document.querySelector("#remove-record-btn").addEventListener("click", () => {
        document.querySelector(`.record-entry${recordIndex - 1}`).remove();
        recordIndex--;
    });

    // 契約中のスポンサーの追加・削除
    let contractsponsorIndex = document.querySelectorAll(".addedcontractsponsor").length + 1;

    document.querySelector("#add-contractsponsor-btn").addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add(`contractsponsor-entry${contractsponsorIndex}`);
        newEntry.innerHTML = `                                      
                    <div class="input-group mt-3">
                        <label class="input-group-text" for="contractsponsor${contractsponsorIndex}">${contractsponsorIndex + 1}</label>
                        <input class="form-control rounded-end" type="text" name="player[contractsponsor][${contractsponsorIndex}]" id="contractsponsor${contractsponsorIndex}" required>                                
                        <div class="valid-feedback">
                            OK!
                        </div>
                    </div>
`;
        document.querySelector("#contractsponsor-container").appendChild(newEntry);
        contractsponsorIndex++;
    });
    document.querySelector("#remove-contractsponsor-btn").addEventListener("click", () => {
        document.querySelector(`.contractsponsor-entry${contractsponsorIndex - 1}`).remove();
        contractsponsorIndex--;
    });

});
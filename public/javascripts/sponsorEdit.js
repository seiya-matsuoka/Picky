document.addEventListener("DOMContentLoaded", () => {

    // 契約中の選手の追加・削除
    let contractplayerIndex = document.querySelectorAll(".addedcontractplayer").length + 1;
    
    document.querySelector("#add-contractplayer-btn").addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add(`contractplayer-entry${contractplayerIndex}`);
        newEntry.innerHTML = `                                      
                    <div class="input-group mt-3">
                        <label class="input-group-text" for="contractplayer${contractplayerIndex}">${contractplayerIndex + 1}</label>
                        <input class="form-control rounded-end" type="text" name="sponsor[contractplayer][${contractplayerIndex}]" id="contractplayer${contractplayerIndex}" required>                                
                        <div class="valid-feedback">
                            OK!
                        </div>
                    </div>
`;
        document.querySelector("#contractplayer-container").appendChild(newEntry);
        contractplayerIndex++;
    });
    document.querySelector("#remove-contractplayer-btn").addEventListener("click", () => {
        document.querySelector(`.contractplayer-entry${contractplayerIndex - 1}`).remove();
        contractplayerIndex--;
    });

});

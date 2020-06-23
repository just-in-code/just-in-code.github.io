const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut pretium diam. Nunc volutpat orci consequat, pretium turpis a, luctus neque. In vitae posuere justo. Phasellus in pretium odio. Morbi rutrum nisl vel libero congue ultrices. Integer et placerat erat, id tempus erat. Nulla iaculis eu ligula a pharetra. |

Cras quam dui, condimentum non lacus nec, lobortis dapibus nisi. Aliquam a tellus lectus. Mauris nec nisi sit amet nisl molestie aliquet lacinia in purus. Nam ornare feugiat arcu. Cras at neque metus. Morbi vestibulum porttitor dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. |

Phasellus arcu diam, auctor eget odio vel, varius facilisis felis. Proin vel metus purus. Quisque at ultricies nibh, at venenatis nulla. Cras nisl purus, blandit at urna in, accumsan mattis augue. Sed ut massa sollicitudin, ultrices libero vel, interdum nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut vel urna vulputate, gravida lorem vel, efficitur odio. Duis tellus neque, maximus gravida leo vitae, sodales luctus ante. Nulla facilisi. Mauris iaculis et orci a tempor. |

Phasellus dignissim efficitur velit, quis efficitur mi dapibus in. Phasellus lacinia, ante a ornare aliquet, dolor mi semper lectus, non porta dolor sapien at enim. Ut fermentum lorem venenatis urna ultricies faucibus. Morbi est felis, malesuada et auctor quis, bibendum at elit. Cras commodo metus eget ipsum blandit iaculis. In iaculis, diam eu rutrum tincidunt, erat dui pretium augue, quis gravida massa justo id nulla. Praesent non nulla diam. Sed in ante congue, commodo mauris eu, gravida tortor. Etiam rhoncus congue urna eu viverra. Sed condimentum tincidunt augue ac lacinia. Vivamus eget condimentum nisi, nec malesuada justo. Proin finibus egestas varius. Integer vel mi eget nisi vulputate convallis quis ut sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sed accumsan urna, quis tincidunt nisl. |

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque in felis sed lectus suscipit congue vitae non ligula. Sed gravida diam vitae tortor molestie, a finibus nunc consequat. Ut sit amet dictum mauris, eu laoreet mauris. Integer ac venenatis quam. Nam id orci ac lorem luctus venenatis. Duis non lectus consequat, pellentesque risus a, faucibus massa. Nullam imperdiet tellus rhoncus eros luctus, eu volutpat lacus eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In hac habitasse platea dictumst. Vivamus suscipit tellus velit. Morbi diam quam, euismod maximus interdum sed, luctus vitae ligula. Cras vulputate massa non elit consectetur, ullamcorper dictum eros rhoncus.`;

const generateLoremIpsum = (num) => {
    if(+num < 1 || +num  > 5){
        alert("Out of range!");
    }
    return text.split('|').slice(0,+num).join("\n");
}

let input = document.getElementById("userInput").addEventListener("keydown",(event) => {
    if(event.keyCode === 13) {
        let userInput = (event.target.value);
        document.getElementById("result").innerHTML = generateLoremIpsum(userInput);
        document.getElementById("result").addEventListener("click",(event) => {
            if(event.textContent == "") {
                return;
            } else {
                let value = event.target;
                value.select();
                document.execCommand('copy');
                alert("Text Copied!");
            }   
        })
    }
})
export const coloringMethods = {
    Iteration: "Iteration Count",
    Normalized: "Normalized Iteration Count",
}
export const palettes = {
    Iteration_Normalized: {
        Classic: "Classic",
        Rainbow: "Rainbow",
        FlatColor: "Flat Color",
        Test: "test",
    },
}

//used to update the available color palettes based on the rendering method selected
export function UpdateColorPalettes(type){
    switch (type){
        case coloringMethods.Normalized:
        case coloringMethods.Iteration:
            return palettes.Iteration_Normalized;
            break;
    }
}

//colors the corrisponding point
export function colorFractalAfter(isInSet, type, palette, ctx, x, y){
    
    if (isInSet == 0){
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 1, 1);
    }else{
        switch (type){
            case coloringMethods.Normalized:
            case coloringMethods.Iteration:
                switch (palette){
                    case palettes.Iteration_Normalized.Classic:
                        ctx.fillStyle = "hsl(" + (isInSet * 2) + ", 100%, " + isInSet + "%)";
                        ctx.fillRect(x, y, 1, 1);
                        break;
                    case palettes.Iteration_Normalized.Rainbow:
                        ctx.fillStyle = "hsl(" + (isInSet * 30) + ", 100%, " + 50 + "%)";
                        ctx.fillRect(x, y, 1, 1);
                        break;
                    case palettes.Iteration_Normalized.FlatColor:
                        ctx.fillStyle = "white";
                        ctx.fillRect(x, y, 1, 1);
                        break;
                    case palettes.Iteration_Normalized.Test:
                        let colors = ["hsl(200, 100%, 50%)", "hsl(200, 100%, 55%)","hsl(200, 100%, 60%)", "hsl(200, 100%, 65%)","hsl(200, 100%, 70%)", "hsl(200, 100%, 75%)","hsl(200, 100%, 80%)", "hsl(200, 100%, 85%)","hsl(200, 100%, 90%)", "hsl(200, 100%, 95%)","hsl(200, 100%, 100%)"]
                        ctx.fillStyle = colors[isInSet % colors.length];
                        ctx.fillRect(x, y, 1, 1);
                        break;
                }
                break;
        }
    }
}

//used to return values that influence how the point will be colored
export function colorFractalBefore(type, cx, cy, i){
    switch (type){
        case coloringMethods.Iteration:
            return i;
            break;
        case coloringMethods.Normalized:
            return i - Math.log(Math.log(Math.sqrt((cx*cx)+(cy*cy)))) / Math.log(2);
            break;
    }
}
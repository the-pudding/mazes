const l=[[{row:0,col:0,walls:[!0,!1,!0,!0],visited:!0,solution:!0,solutionIndex:0},{row:0,col:1,walls:[!0,!0,!1,!1],visited:!0,solution:!0,solutionIndex:1},{row:0,col:2,walls:[!0,!1,!1,!0],visited:!1,solution:!1},{row:0,col:3,walls:[!0,!1,!0,!1],visited:!1,solution:!1},{row:0,col:4,walls:[!0,!0,!0,!1],visited:!1,solution:!1},{row:0,col:5,walls:[!0,!1,!1,!0],visited:!1,solution:!1},{row:0,col:6,walls:[!0,!1,!1,!1],visited:!1,solution:!1},{row:0,col:7,walls:[!0,!0,!1,!1],visited:!1,solution:!1}],[{row:1,col:0,walls:[!0,!1,!1,!0],visited:!0,solution:!0,solutionIndex:3},{row:1,col:1,walls:[!1,!0,!0,!1],visited:!0,solution:!0,solutionIndex:2},{row:1,col:2,walls:[!1,!1,!1,!0],visited:!1,solution:!1},{row:1,col:3,walls:[!0,!0,!1,!1],visited:!1,solution:!1},{row:1,col:4,walls:[!0,!1,!1,!0],visited:!1,solution:!1},{row:1,col:5,walls:[!1,!0,!0,!1],visited:!1,solution:!1},{row:1,col:6,walls:[!1,!0,!1,!0],visited:!1,solution:!1},{row:1,col:7,walls:[!1,!0,!0,!0],visited:!1,solution:!1}],[{row:2,col:0,walls:[!1,!0,!1,!0],visited:!0,solution:!0,solutionIndex:4},{row:2,col:1,walls:[!0,!1,!0,!0],visited:!1,solution:!1},{row:2,col:2,walls:[!1,!0,!0,!1],visited:!1,solution:!1},{row:2,col:3,walls:[!1,!1,!0,!0],visited:!1,solution:!1},{row:2,col:4,walls:[!1,!0,!1,!1],visited:!1,solution:!1},{row:2,col:5,walls:[!0,!0,!1,!0],visited:!1,solution:!1},{row:2,col:6,walls:[!1,!1,!0,!0],visited:!1,solution:!1},{row:2,col:7,walls:[!0,!0,!1,!1],visited:!1,solution:!1}],[{row:3,col:0,walls:[!1,!0,!1,!0],visited:!0,solution:!0,solutionIndex:5},{row:3,col:1,walls:[!0,!1,!1,!0],visited:!0,solution:!0,solutionIndex:8},{row:3,col:2,walls:[!0,!1,!0,!1],visited:!0,solution:!0,solutionIndex:9},{row:3,col:3,walls:[!0,!0,!1,!1],visited:!0,solution:!0,solutionIndex:10},{row:3,col:4,walls:[!1,!1,!0,!0],visited:!1,solution:!1},{row:3,col:5,walls:[!1,!0,!1,!1],visited:!1,solution:!1},{row:3,col:6,walls:[!0,!1,!1,!0],visited:!1,solution:!1},{row:3,col:7,walls:[!1,!0,!0,!1],visited:!1,solution:!1}],[{row:4,col:0,walls:[!1,!1,!0,!0],visited:!0,solution:!0,solutionIndex:6},{row:4,col:1,walls:[!1,!0,!0,!1],visited:!0,solution:!0,solutionIndex:7},{row:4,col:2,walls:[!0,!0,!1,!0],visited:!0,solution:!1},{row:4,col:3,walls:[!1,!1,!0,!0],visited:!0,solution:!0,solutionIndex:11},{row:4,col:4,walls:[!0,!0,!1,!1],visited:!0,solution:!0,solutionIndex:12},{row:4,col:5,walls:[!1,!0,!1,!0],visited:!1,solution:!1},{row:4,col:6,walls:[!1,!1,!0,!0],visited:!1,solution:!1},{row:4,col:7,walls:[!0,!0,!1,!1],visited:!1,solution:!1}],[{row:5,col:0,walls:[!0,!1,!1,!0],visited:!0,solution:!1},{row:5,col:1,walls:[!0,!1,!0,!1],visited:!0,solution:!1},{row:5,col:2,walls:[!1,!0,!1,!1],visited:!0,solution:!1},{row:5,col:3,walls:[!0,!1,!1,!0],visited:!0,solution:!0,solutionIndex:14},{row:5,col:4,walls:[!1,!0,!0,!1],visited:!0,solution:!0,solutionIndex:13},{row:5,col:5,walls:[!1,!1,!0,!0],visited:!1,solution:!1},{row:5,col:6,walls:[!0,!0,!1,!1],visited:!1,solution:!1},{row:5,col:7,walls:[!1,!0,!1,!0],visited:!1,solution:!1}],[{row:6,col:0,walls:[!1,!0,!1,!0],visited:!0,solution:!1},{row:6,col:1,walls:[!0,!1,!0,!0],visited:!0,solution:!1},{row:6,col:2,walls:[!1,!0,!0,!1],visited:!0,solution:!1},{row:6,col:3,walls:[!1,!0,!1,!0],visited:!0,solution:!0,solutionIndex:15},{row:6,col:4,walls:[!0,!1,!0,!0],visited:!1,solution:!1},{row:6,col:5,walls:[!0,!1,!0,!1],visited:!1,solution:!1},{row:6,col:6,walls:[!1,!0,!0,!1],visited:!1,solution:!1},{row:6,col:7,walls:[!1,!0,!1,!0],visited:!1,solution:!1}],[{row:7,col:0,walls:[!1,!1,!0,!0],visited:!0,solution:!1},{row:7,col:1,walls:[!0,!1,!0,!1],visited:!0,solution:!1},{row:7,col:2,walls:[!0,!1,!0,!1],visited:!0,solution:!1},{row:7,col:3,walls:[!1,!1,!0,!1],visited:!0,solution:!0,solutionIndex:16},{row:7,col:4,walls:[!0,!1,!0,!1],visited:!0,solution:!0,solutionIndex:17},{row:7,col:5,walls:[!0,!1,!0,!1],visited:!0,solution:!0,solutionIndex:18},{row:7,col:6,walls:[!0,!1,!0,!1],visited:!0,solution:!0,solutionIndex:19},{row:7,col:7,walls:[!1,!0,!0,!1],visited:!0,solution:!0,solutionIndex:20}]];export{l as default};

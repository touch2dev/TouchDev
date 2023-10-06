"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "win", closeable: 1, modal:1, id: "Add a Variable", 
                    v: [{ v: "", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Add a Number Variable", {c: "win", closeable: 1, modal:1,id: "Add a num Variable", 
                    v: [{ v: "", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  ["Add Text to Display", {c: "win", closeable: 1,modal:1, id: "Add text to display...", 
                    v: [{ v: "", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Save JSON File", {c: "win", closeable: 1,modal:1,id: "Download the JSON File?", 
                    v:["Are you sure you want to download the JSON file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}],
  ["Load JSON File", {c: "win", closeable: 1,modal:1, id: "Load the JSON File?", 
                    v:["Select the JSON file you want to load?", {id:"myfile", cap:"",c:"file",accepts:"text"},
                        { c: "btn", id: "btn_loadejsfile", cap:"Open"}]}],
  // link to index2.html
  ["Open Prototype 1", {c: "win", closeable: 1,modal:1, id: "Open Prototype 1", 
                    v:[{ c: "btn", id: "prot1", cap:"Open"}]}],
  ["New Code Format Draft 10/4", {c: "win", closeable: 1,modal:1, id: "selfsb5drft", 
                    v:[{ c: "btn", id: "selfsb5", cap:"Open"}]}],
  ["Front Page Draft", {c: "win", closeable: 1,modal:1, id: "fpagedrft", 
                    v:[{ c: "btn", id: "fpage", cap:"Open"}]}]
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode, newcode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value, filecontent;
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};
let intcode = {var:{},cmd:{}};


  app.start(event=>{app.display({
      cap: "JavaScript TouchDev (in-progress)", require: { c: ["grid", "opt"] }, style: "self_sb.css",
      value: [
        { id: "Your space"},
        { id: "Things to Do", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
      ]
    });
  });

  //app.event({u:''}, event=>{});
  // NEW FORMAT IS THIS ↑


  app.event({}, event=>{
    if (COMPONENTS.has(event.u) && event.v===true) {
      app.display({queue:[{add:[COMPONENTS.get(event.u)]}]});
    }
    else if (event.u === "inpt_addtxt_name") { inpt_addtxt_name = event.v;} 
    else if (event.u === "prot1") { window.location.href = "prot2/index2.html";}
    else if (event.u === "selfsb5") { window.location.href = "cdraft/index5.html";}
    else if (event.u === "fpage") { window.location.href = "frontpage/mainindex.html";}   
    else if (event.u === "inpt_addtxt_value") { inpt_addtxt_value = event.v;}
    else if (event.u === "inpt_print_value") { inpt_print_value = event.v;}
    else if (event.u === "inpt_addnum_name") { inpt_addnum_name = event.v;}
    else if (event.u === "inpt_addnum_value") { inpt_addnum_value = Number(event.v);}
    else if (event.u === "myfile") { filecontent = event.v;}
    else if (event.u === "btn_savejsfile") { 
      for(const element of code.functions.home.vars) {
        if (element.type === "text") {
          jscode += ("let " + element.name + " = \"" + element.value + "\";");
        } else {
          jscode += ("let " + element.name + " = " + element.value + ";");
        }
      }
      for(const element of code.functions.home.commands) {
        if (element.type === "print") {
          jscode += ("console.log(\"" + element.value + "\");");
        }
      }
      let savablecode = JSON.stringify(code);
      app.display({save:['javascript.json', savablecode]});
    }
    
    else if (event.u === "btn_addtextvar") {
      if (code.functions.home.vars.length === 0) {
        code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
      } else {
        let nameFound = false;
        for (const element of code.functions.home.vars) {
          if (element.name === inpt_addtxt_name.trim()) {
            element.value = inpt_addtxt_value.trim();
            nameFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!nameFound){
            code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
        }
        
      }
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_addnumvar") {
      if (Number.isFinite(inpt_addnum_value)) {
        if (code.functions.home.vars.length === 0) {
          code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        } else {
          let numberFound = false;
          for (const element of code.functions.home.vars) {
          if (element.name === inpt_addnum_name.trim()) {
            element.value = inpt_addnum_value;
            numberFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!numberFound){
            code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        }}
  
      app.display({U:"Your space", v:[]});
      } 
      else{
        app.display({add:[{c: "win", closeable: 1, modal:1, v: ["Please enter a number in the value field."]}]});
      }
    }
    else if (event.u === "btn_println") {
      code.functions.home.commands.push({type:"print",value:inpt_print_value.trim()});
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_loadejsfile") {
      if (event.v != undefined) {
        let filestin = JSON.parse(filecontent);
        for(const element of filestin.functions.home.vars) {
          if (element.type === "text") {
            newcode += ("let " + element.name + " = \"" + element.value + "\";" + "\n");
          } else {
            newcode += ("let " + element.name + " = " + element.value + ";" + "\n");
          }
        }
        for(const element of filestin.functions.home.commands) {
          if (element.type === "print") {
            newcode += ("console.log(\"" + element.value + "\");" + "\n");
          }
        }
        app.display({U:"Your space", add:[newcode]});
      }
    }
    
      if(newcode!== ""){app.display({U:"Your space", v:[newcode]});}else{app.display({U:"Your space", v:[]});}
      for(const element of code.functions.home.vars) {
        if (element.type === "text") {
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.name + " = \"" + element.value + "\";" }]});
          intcode.var.push({var:{type:"text",name:element.name,value:element.value}});
        } else {
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.name + " = " + element.value + ";" }]});
          intcode.var.push({var:{type:"number",name:element.name,value:element.value}});
        }
      }
      for(const element of code.functions.home.commands) {
        if (element.type === "print") {
          app.display({U:"Your space",add: [{ c: "txt", v: "console.log(\"" + element.value + "\");" }]});
          intcode.cmd.push({cmd:{type:"print",value:element.value}});
        }
      }
      console.log("code: " + code);
      console.log("intcode: " + intcode);
  
  });

  // list of things to work with
  //  - making the window closable once the user clicks on the add button
  
  

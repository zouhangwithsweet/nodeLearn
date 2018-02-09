<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        * , *:after, *:before {
            box-sizing: border-box;
        }
        ul,ol li {
            list-style: none;
        }
        body {
            margin: 30px;
        }
        a {
            display: block;
            font-size: 14px;
            line-height: 30px;
            overflow: hidden; 
            white-space: nowrap; 
            text-overflow: ellipsis; 
            -o-text-overflow: ellipsis;
            text-align: center;
            padding: 0 10px;
            text-decoration: none;
            color: #333;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
        }
        li {
            width: 160px;
            height: 30px;
            margin-right: 10px;
            border-bottom: 1px solid #a1a1a1;
            display: flex;
            align-items: center;
        }
        li i {
            color: darkgreen;
        }
    </style>
</head>
<body>
    <ul>
        {{#each files}}
        <li>
            <i class="fa fa-file"></i><a href="{{../dir}}/{{this}}">{{this}}</a>
        </li>
        {{/each}}
    </ul>
</body>
</html>
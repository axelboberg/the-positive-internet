module.exports = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg class="u-width--rel--90" width="449px" height="250px" viewBox="0 0 449 157" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <style>
          #bubble_1, #bubble_2 {
            animation-name: bubble-in;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;

            transform: translate(0, 40%);
            opacity: 0;
          }

          #bubble_1 {
            animation-delay: 0.5s;
          }

          #bubble_2 {
            animation-delay: 1.5s;
          }

          @keyframes bubble-in {
            0% { transform: translate(0, 40%); opacity: 0; }
            100% { transform: translate(0, 0); opacity: 1; }
          }

          #bubble_1 #line_1,
          #bubble_1 #line_2,
          #bubble_2 #line_1 {
            animation-name: line-in;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;

            -webkit-clip-path: inset(0 100% 0 0);
            clip-path: inset(0 100% 0 0);
          }

          #bubble_1 #line_1 {
            animation-delay: 0.8s;
          }

          #bubble_1 #line_2 {
            animation-delay: 1s;
          }

          #bubble_2 #line_1 {
            animation-name: line-in-mirror;
            animation-delay: 1.8s;

            -webkit-clip-path: inset(0 0 0 100%);
            clip-path: inset(0 0 0 100%);
          }

          @keyframes line-in {
            0% { -webkit-clip-path: inset(0 100% 0 0); clip-path: inset(0 100% 0 0); }
            100% { -webkit-clip-path: inset(0 0% 0 0); clip-path: inset(0 0% 0 0); }
          }

          @keyframes line-in-mirror {
            0% { -webkit-clip-path: inset(0 0 0 100%); clip-path: inset(0 0 0 100%); }
            100% { -webkit-clip-path: inset(0 0 0 0%); clip-path: inset(0 0 0 0%); }
          }
      </style>
      <g id="bubbles" stroke-width="1">
          <g id="bubble_1">
            <path d="M14,6 L196,6 C203.731986,6 210,12.2680135 210,20 L210,66.3915344 C210,74.1235209 203.731986,80.3915344 196,80.3915344 L50.6400341,80.3915344 C47.9713874,80.3915344 45.3937412,81.3616747 43.3873259,83.1212125 L26.3186742,98.0896688 C25.4882065,98.8179524 24.2245888,98.7351159 23.4963051,97.9046481 C23.1763891,97.5398454 23,97.0711824 23,96.5859739 L23,84.3915344 C23,82.1823954 21.209139,80.3915344 19,80.3915344 L11.5,80.3915344 C5.14872538,80.3915344 8.25858318e-14,75.242809 4.79616347e-14,68.8915344 L0,20 C-1.12479706e-14,12.2680135 6.2680135,6 14,6 Z" id="bubble_1_shadow" fill-opacity="0.06" fill="#000000"></path>
            <path d="M14,0 L196,-4.26325641e-14 C203.731986,-5.77876741e-14 210,6.2680135 210,14 L210,60.3915344 C210,68.1235209 203.731986,74.3915344 196,74.3915344 L50.6400341,74.3915344 C47.9713874,74.3915344 45.3937412,75.3616747 43.3873259,77.1212125 L26.3186742,92.0896688 C25.4882065,92.8179524 24.2245888,92.7351159 23.4963051,91.9046481 C23.1763891,91.5398454 23,91.0711824 23,90.5859739 L23,78.3915344 C23,76.1823954 21.209139,74.3915344 19,74.3915344 L11.5,74.3915344 C5.14872538,74.3915344 8.25858318e-14,69.242809 4.79616347e-14,62.8915344 L0,14 C-1.12479706e-14,6.2680135 6.2680135,-8.3210158e-16 14,-1.59872116e-14 Z" fill="#FFFFFF"></path>
            <rect id="line_1" fill="#E7E2E5" x="17" y="16" width="139" height="17"></rect>
            <rect id="line_2" fill="#E7E2E5" x="17" y="41" width="82" height="17"></rect>
          </g>
          <g transform="translate(239.000000, 58.000000)">
              <g id="bubble_2">
                <path d="M14,6 L196,6 C203.731986,6 210,12.2680135 210,20 L210,66.3915344 C210,74.1235209 203.731986,80.3915344 196,80.3915344 L50.6400341,80.3915344 C47.9713874,80.3915344 45.3937412,81.3616747 43.3873259,83.1212125 L26.3186742,98.0896688 C25.4882065,98.8179524 24.2245888,98.7351159 23.4963051,97.9046481 C23.1763891,97.5398454 23,97.0711824 23,96.5859739 L23,84.3915344 C23,82.1823954 21.209139,80.3915344 19,80.3915344 L11.5,80.3915344 C5.14872538,80.3915344 8.25858318e-14,75.242809 4.79616347e-14,68.8915344 L0,20 C-1.12479706e-14,12.2680135 6.2680135,6 14,6 Z" id="bubble_2_shadow" fill-opacity="0.08" fill="#212133" transform="translate(105.000000, 53.500000) scale(-1, 1) translate(-105.000000, -53.500000) "></path>
                <path d="M14,0 L196,-4.26325641e-14 C203.731986,-5.77876741e-14 210,6.2680135 210,14 L210,60.3915344 C210,68.1235209 203.731986,74.3915344 196,74.3915344 L50.6400341,74.3915344 C47.9713874,74.3915344 45.3937412,75.3616747 43.3873259,77.1212125 L26.3186742,92.0896688 C25.4882065,92.8179524 24.2245888,92.7351159 23.4963051,91.9046481 C23.1763891,91.5398454 23,91.0711824 23,90.5859739 L23,78.3915344 C23,76.1823954 21.209139,74.3915344 19,74.3915344 L11.5,74.3915344 C5.14872538,74.3915344 8.25858318e-14,69.242809 4.79616347e-14,62.8915344 L0,14 C-1.12479706e-14,6.2680135 6.2680135,-8.3210158e-16 14,-1.59872116e-14 Z" fill="#212133" transform="translate(105.000000, 47.500000) scale(-1, 1) translate(-105.000000, -47.500000) "></path>
                <rect id="line_1" fill="#3E3E5C" transform="translate(87.500000, 28.500000) scale(-1, 1) translate(-87.500000, -28.500000) " x="18" y="17" width="139" height="23"></rect>
                <text id="!?$#!%" font-family="BasicSans-SemiBold, Basic Sans, sans-serif" font-size="30" font-weight="500" fill="#FFFFFF">
                    <tspan x="35.455" y="48">!?$#!%</tspan>
                </text>
              </g>
          </g>
      </g>
  </svg>
`
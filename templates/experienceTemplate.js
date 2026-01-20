export const experienceTemplate = 
`<div id="{{id}}" class="experience-card">
    <div class="card shadow border-0">
        <div class="card-body p-4 p-md-5">
            <h5 class="card-title text-center mb-1 fw-bold">{{title}}</h5>
            <p class="text-center text-{{color}} fw-bold mb-4">{{company}} | {{period}}</p>
            <div class="mx-auto" style="max-width: 800px;">
                {{#each tasks}}
                    <p class="card-text mb-3 d-flex align-items-start">
                        <i class="bi bi-arrow-right-circle text-{{../color}} me-3"></i>
                        <span>{{this}}</span>
                    </p>
                {{/each}}
                <div class="text-center mt-4">
                    {{#each badges}}
                        <span class="badge bg-{{style}}">{{name}}</span>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
</div>`;
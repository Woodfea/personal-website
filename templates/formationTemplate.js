export const formationTemplate = 
   `<div id="formation-template">
        <div class="border-0">
            <div class="p-md-2">
                {{#each formations}}
                    <div class="mb-5">
                        <h5 class="text-center mb-1 fw-bold">{{this.title}}</h5>
                        <p class="text-center text-primary fw-bold mb-4">{{this.school}} | {{this.period}}</p>
                        <div class="mx-auto" style="max-width: 800px;">
                            {{#if this.description}}
                            <p class="mb-3 d-flex align-items-start">
                                <i class="bi bi-arrow-right-circle text-{{../color}} me-3"></i>
                                <span>{{this.description}}</span>
                            </p>
                            {{/if}}
                            <div class="text-center mt-4">
                                {{#each this.badges}}
                                    <span class="badge bg-{{style}}">{{name}}</span>
                                {{/each}}
                            </div>
                        </div>
                    </div>
                {{/each}}
            </div>
        </div>
    </div>`;
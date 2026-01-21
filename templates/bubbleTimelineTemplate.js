export const bubbleTimelineTemplate = 
` 
<div id="MPD-div-exp-{{id}}" class="d-flex flex-column align-items-center" data-json="{{jsonDataset}}">
    <div class="timeline-bubble d-flex align-items-center justify-content-center fw-bold text-secondary">
        {{number}}
    </div>
    <div class="mt-2 fw-bold text-success">{{year}}</div>
    <small class="text-muted">{{contractType}} - {{company}}</small>
</div>
`
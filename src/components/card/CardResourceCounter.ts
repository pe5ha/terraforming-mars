import Vue from 'vue';
import {ResourceType} from '../../ResourceType';
export const CardResourceCounter = Vue.component('CardResourceCounter', {
  props: {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String as () => ResourceType,
      required: true,
    },
  },
  computed: {
    getClass(): string {
      switch (this.type) {
      case ResourceType.ANIMAL:
        return 'card-resource-animal';
      case ResourceType.MICROBE:
        return 'card-resource-microbe';
      case ResourceType.FIGHTER:
        return 'card-resource-fighter';
      case ResourceType.SCIENCE:
        return 'card-resource-science';
      case ResourceType.FLOATER:
        return 'card-resource-floater';
      case ResourceType.ASTEROID:
        return 'card-resource-asteroid';
      case ResourceType.PRESERVATION:
        return 'card-resource-preservation';
      case ResourceType.CAMP:
        return 'card-resource-camp';
      case ResourceType.DISEASE:
        return 'card-resource-disease';
      case ResourceType.RESOURCE_CUBE:
        return 'card-resource-resource-cube';
      case ResourceType.DATA:
        return 'card-resource-data';
      case ResourceType.SYNDICATE_FLEET:
        return 'card-resource-syndicate-fleet';
      default:
        return '';
      }
    },
  },
  template: `
    <div class="card-resources-counter">
      <span class="card-resources-counter-number"> {{ amount }}</span>
      <span class="card-resource" :class="getClass"></span>
    </div>
    `,
});

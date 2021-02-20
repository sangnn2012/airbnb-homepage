import { shallowMount } from '@vue/test-utils'
import MyAutocomplete from '@/components/MyAutocomplete.vue'
import Vue from 'vue'
describe('MyAutocomplete.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(MyAutocomplete, {
            propsData: {
                value: true
            }
        })
    })
    it("remove accents", () => {
        let result = wrapper.vm.removeAccents("Tiền Giang");
        expect(result).toMatch('tiengiang');
    })
    it("check search text", () => {
        wrapper.vm.chooseProvince("Tiền Giang");
        expect(wrapper.vm.searchText).toMatch("Tiền Giang")
    })
    it("check dropdown and filtered provinces when enter an option, dropdown should true", () => {
        wrapper.vm.searchText = 'a';
        Vue.nextTick(() => {
            expect(wrapper.vm.isDropdown).toBe(true);
            expect(wrapper.vm.filteredProvinces.length > 0).toBe(true);
        })
    })
    it("check when searchText is empty, dropdown should be false", () => {
        wrapper.vm.searchText = '';
        Vue.nextTick(() => {
            expect(wrapper.vm.isDropdown).toBe(false);
            expect(wrapper.vm.filteredProvinces.length > 0).toBe(false);
        })
    })
    it("check when searchText is complete, dropdown should be false", () => {
        wrapper.vm.searchText = "Tiền Giang";
        Vue.nextTick(() => {
            expect(wrapper.vm.isDropdown).toBe(false);
            expect(wrapper.vm.filteredProvinces.length > 0).toBe(false);
        })
    })
})

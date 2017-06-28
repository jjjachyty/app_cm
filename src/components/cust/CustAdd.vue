<template>
    <div>
        <!--导航头-->
        <div>
            <mu-appbar title="新增客户">
                <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="back()" />
            </mu-appbar>
        </div>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户号</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-sub-header>{{custCode}}</mu-sub-header>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户名称</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-text-field hintText="客户名称" type="text" v-model="Cust.CustName" fullWidth />
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>客户级别</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="Cust.CustImplvl" fullWidth>
                    <mu-menu-item value="1" title="核心客户" />
                    <mu-menu-item value="2" title="潜力客户" />
                    <mu-menu-item value="3" title="非目标客户" />
                </mu-select-field>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>信用评级</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="Cust.CustCredit" fullWidth>
                    <mu-menu-item value="AAA+" title="AAA+" />
                    <mu-menu-item value="AAA" title="AAA" />
                    <mu-menu-item value="AAA-" title="AAA-" />
                    <mu-menu-item value="AA+" title="AA+" />
                    <mu-menu-item value="AA" title="AA" />
                    <mu-menu-item value="AA-" title="AA-" />
                    <mu-menu-item value="A+" title="A+" />
                    <mu-menu-item value="A" title="A" />
                    <mu-menu-item value="A-" title="A-" />
                    <mu-menu-item value="BBB" title="BBB" />
                    <mu-menu-item value="BB" title="BB" />
                    <mu-menu-item value="B" title="B" />
                    <mu-menu-item value="CCC" title="CCC" />
                    <mu-menu-item value="CC" title="CC" />
                    <mu-menu-item value="C" title="C" />
                    <mu-menu-item value="D" title="D" />
                    <mu-menu-item value="" title="无评级" />
                </mu-select-field>
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>行业</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="50" tablet="65" desktop="65">
                <mu-text-field hintText="选择行业" :errorText="productErr" fullWidth disabled :value="Cust.Industry.IndustryName" /></mu-col>
            <mu-col width="10" tablet="5" desktop="5">
                <mu-icon-button icon="add_box" @click="openPop" iconClass="form-icon-color" />
            </mu-col>
        </mu-row>
    
        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>规模</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <mu-select-field v-model="Cust.CustSize" fullWidth>
                    <mu-menu-item value="1" title="大型" />
                    <mu-menu-item value="2" title="中型" />
                    <mu-menu-item value="3" title="小型" />
                    <mu-menu-item value="4" title="微型" />
                    <mu-menu-item value="5" title="事业" />
                    <mu-menu-item value="6" title="零售" />
                    <mu-menu-item value="7" title="未知" />
                </mu-select-field>
            </mu-col>
        </mu-row>

        <mu-row class="context">
            <mu-col width="40" tablet="30" desktop="30">
                <mu-sub-header>
                    <strong>机构</strong>
                </mu-sub-header>
            </mu-col>
            <mu-col width="60" tablet="60" desktop="60">
                <span>{{Cust.Branch.OrganName}}</span>
            </mu-col>
        </mu-row>



    </div>
</template>

<script>
import CustItem from 'components/cust/CustItem'

export default {
    components: {

    },
    data() {
        return {
            Cust: { CustImplvl: '2', Industry: { IndustryName: '' } },
            custCode: ""
        }
    },
    methods: {
        back() {
            router.push({ name: 'custs' })
        }, addCust() {
            router.push({ name: 'addcust' })
        }
    }, created() {
        this.custCode = 'CUST' + (new Date().getTime().toString())
    }
}
</script>
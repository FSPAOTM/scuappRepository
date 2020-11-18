from django.shortcuts import HttpResponse,render
from django.template import loader
from .models import Tbcompany, Tbmanager, Tbstudent,Tbresume, Tbqualify,TbinWork,TboutWork,Tbapplication
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils import timezone
import json
from itertools import chain
#以下是企业
#ccenter返回企业名称
@csrf_exempt
def Show_company_name(request):
    if request.method == "POST":
        phone_num = request.POST.get('phone')  #前端从Get_outwork_info界面接收ow_number并存为全局变量
        user = Tbcompany.objects.get(phone_num=phone_num)
        com_name = user.com_name
        return HttpResponse(json.dumps({"name":com_name}))
        #print(json.dumps({"name":com_name}))
    else:
        return HttpResponse("请求错误")

#cinfofill企业信息修改显示功能
@csrf_exempt
def Company_info_showmodiify(request):
    if request.method == "POST":
        phone_num = request.POST.get('phone')  # 唯一标识简历的全局变量
        user = Tbcompany.objects.get(phone_num=phone_num)
        com_License = user.com_License.com_license
        com_name = user.com_name
        com_leader = user.com_leader
        e_mail = user.e_mail
        com_address = user.com_address
        qualify = Tbqualify.objects.get(com_license=com_License)
        com_condition = qualify.com_condition
        com_business = qualify.com_business
        return HttpResponse(json.dumps(
            {"cno": com_License,
             "company": com_name,
             "manname": com_leader,
             "email": e_mail,
             "address": com_address,
             "contents": com_business,
             "condition": com_condition}))
    else:
        return HttpResponse("请求错误")

#cinfofill企业信息修改功能
@csrf_exempt
def Company_info_modiify(request):
    if request.method == "POST":
        com_License = request.POST.get('cno')  # 唯一标识简历的全局变量
        phone_num = request.POST.get('phone')
        com_leader = request.POST.get('manname')
        e_mail = request.POST.get('email')
        com_address = request.POST.get('address')
        com_business = request.POST.get('contents')
        com_condition = request.POST.get('condition')
        Tbcompany.objects.filter(com_License=com_License).update(phone_num=phone_num, com_leader=com_leader, e_mail=e_mail, com_address=com_address)
        Tbqualify.objects.filter(com_license=com_License).update(com_business=com_business, com_condition=com_condition)
        return HttpResponse("填写完成")
    else:
        return HttpResponse("请求错误")

#cjobrelease企业兼职信息发布功能
@csrf_exempt
def Part_time_post(request):
    if request.method == "POST":
        phone_num = request.POST.get('company')
        ow_post = request.POST.get('Name')
        w_time = request.POST.get('jobtime')
        w_place = request.POST.get('location')
        w_place_detail = request.POST.get('detail')
        work = request.POST.get('description')
        w_salary = request.POST.get('salary')
        w_reuire = request.POST.get('ask')
        w_amount = request.POST.get('num')
        ddl_time = request.POST.get('endingtime')
        ipub_time = timezone.now()
        w_ps = request.POST.getlist('ps')
        User = Tbcompany.objects.get(phone_num=phone_num)
        outwork = TboutWork.objects.create(ow_post=ow_post,w_time=w_time,w_place=w_place,w_place_detail=w_place_detail,work=work,w_salary=w_salary,w_reuire=w_reuire,w_amount=w_amount,ddl_time=ddl_time,ipub_time=ipub_time,w_ps=w_ps,com_number=User,ow_status = '待审核')
        outwork.save()
        return HttpResponse("发布成功")
    else:
        return HttpResponse("请求错误")

#cfabu 企业兼职信息展示功能 后期尝试完善在这里传already
@csrf_exempt
def Get_outwork_info(request):
    phone_num = request.GET.get('user')#获取全局变量
    com = Tbcompany.objects.get(phone_num=phone_num)
    result = TboutWork.objects.all().filter(com_number=com)#获取对象
    plays = []
    for i in result:
        plays.append({'ow_number':i.ow_number,'post':i.ow_post,'time':str(i.w_time),'location':i.w_place,'detail':i.w_place_detail,'description':i.work,'salary':i.w_salary,'ask':i.w_reuire,'num':i.w_amount,'ddl':str(i.ddl_time),'ps':i.w_ps,'status':i.ow_status})
    plays_json = json.dumps(plays,ensure_ascii=False)
    return HttpResponse(plays_json)

#cjobshow 企业发布兼职信息展示功能
@csrf_exempt
def Get_outwork_detail_info(request):
    if request.method == "POST":
        ow_number = request.POST.get('ow_number')
        result = TboutWork.objects.get(ow_number=ow_number)
        post = result.ow_post
        time = result.w_time
        location = result.w_place
        detail = result.w_place_detail
        salary = result.w_salary
        description = result.work
        ask = result.w_reuire
        num = result.w_amount
        ddl = str(result.ddl_time)
        ps = result.w_ps
        already = Tbapplication.objects.filter(ow_number=ow_number).count()
        return HttpResponse(json.dumps({
            "post":post,
            "time":time,
            "location":location,
            "detail":detail,
            "salary":salary,
            "description":description,
            "ask":ask,
            "num":num,
            "ddl":ddl,
            "ps":ps,
            "already": already}))
    else:
        return HttpResponse("请求错误")

#cjobshow后的企业兼职信息修改界面
@csrf_exempt
def Modify_outwork_info(request):
    if request.method == "POST":
        ow_number = request.POST.get('ow_number')
        phone_num = request.POST.get('company')
        ow_post = request.POST.get('Name')
        w_time = request.POST.get('jobtime')
        w_place = request.POST.get('location')
        w_place_detail = request.POST.get('detail')
        work = request.POST.get('description')
        w_salary = request.POST.get('salary')
        w_reuire = request.POST.get('ask')
        w_amount = request.POST.get('num')
        ddl_time = request.POST.get('endingtime')
        ipub_time = timezone.now()
        w_ps = request.POST.getlist('ps')
        User = Tbcompany.objects.get(phone_num=phone_num)
        TboutWork.objects.filter(ow_number=ow_number).update(ow_post=ow_post, w_time=w_time, w_place= w_place, w_place_detail=w_place_detail, work=work,
                                           w_salary=w_salary, w_reuire=w_reuire, w_amount=w_amount, ddl_time=ddl_time,
                                           ipub_time=ipub_time, w_ps=w_ps, com_number=User, ow_status='待审核')
        return HttpResponse("修改成功")
    else:
        return HttpResponse("请求错误")

#cworkspace 企业端报名者显示功能
@csrf_exempt



#cworkspace 未调试未加URL
@csrf_exempt
def Get_applicant_info(request):
    result = Tbapplication.objects.all().filter(apply_status='待审核')#获取对象
    plays = []
    for i in result:
        plays.append({'title':i.ow_post,'stu':i.w_amount,'place':i.w_place,'salary':i.w_salary,'depart':'某公司','w_number':i.ow_number})
    plays_json = json.dumps(plays,ensure_ascii=False)
    return HttpResponse(plays_json)#转换为json格式

#企业兼职信息状态修改界面 这个还没有加URL界面
@csrf_exempt
def Stop_outwork(request):
    if request.method == "POST":
        ow_number = request.POST.get('XXXXX')
        filterResult1 = TboutWork.objects.filter(ow_number=ow_number)
        if len(filterResult1) > 0:
            TboutWork.objects.filter(ow_number=ow_number ).update(ow_status = 'stop')
            return HttpResponse("该招聘已停止")
        else:
            return HttpResponse("请求错误")

#cinterview 企业面试时间申请 未调试 未写完
@csrf_exempt
def Company_apply_interviewtime(request):
    if request.method == "POST":
        account_num = request.POST.get('ManNumber')
        account_name = request.POST.get('Name')
        account_phone=request.POST.get('phoneNum')
        passwd_1 = request.POST.get('password')
        filterResult =Tbmanager.objects.filter(manager_id=account_num)
        if len(filterResult) > 0:
            return HttpResponse("用户已存在")
        else:
            user = Tbmanager.objects.create(manager_id=account_num, name=account_name, phonenumber=account_phone, password=passwd_1)
            user.save()
            return HttpResponse("注册成功")
    else:
        return HttpResponse("请求错误")
from django.shortcuts import HttpResponse
from django.template import loader
from .models import Tbcompany, Tbmanager, Tbstudent,Tbresume, Tbqualify
from django.views.decorators.csrf import csrf_exempt
#from  django.http import HttpResponse (暂时不清楚http和shortcuts的区别）


def index(request):
    return HttpResponse("hello")


def detail(request, manager_id):
    return HttpResponse("You're looking at managerid %s." % manager_id)

@csrf_exempt
def dengluzhuce_login(request):
    if request.method == "POST":
        account_num = request.POST.get('no')
        passwd = request.POST.get('pwd')
        if len(account_num) == 8:
            try:
               user = Tbmanager.objects.get(manager_id=account_num)
               if user.password != passwd:
                    return HttpResponse("用户名或密码错误")
            except Tbmanager.DoesNotExist as e:
                return HttpResponse("用户名不存在")
        # 登录成功
            print(account_num)
            print(passwd)
            return HttpResponse("登录成功！")
        else:
            if len(account_num) == 11:
                try:
                    user = Tbcompany.objects.get(phone_num=account_num)
                    if user.password != passwd:
                        return HttpResponse("用户名或密码错误")
                except Tbcompany.DoesNotExist as e:
                    return HttpResponse("用户名不存在")
                # 登录成功
                print(account_num)
                print(passwd)
                return HttpResponse("登录成功！")
            else:
                if len(account_num) == 13:
                    try:
                        user = Tbstudent.objects.get(stu_id=account_num)
                        if user.password != passwd:
                            return HttpResponse("用户名或密码错误")
                    except Tbstudent.DoesNotExist as e:
                        return HttpResponse("用户名不存在")
                    # 登录成功
                    print(account_num)
                    print(passwd)
                    return HttpResponse("登录成功！")
                else:
                    return HttpResponse("用户名不存在")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Manage_register(request):
    #curtime=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime());注册时间？
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

@csrf_exempt
def Student_register(request):
    if request.method == "POST":
        account_num = request.POST.get('stuNumber')
        account_name = request.POST.get('Name')
        nickname = request.POST.get('NickName')
        account_phone=request.POST.get('phoneNum')
        passwd_1 = request.POST.get('password')

        filterResult =Tbstudent.objects.filter(stu_id=account_num)
        if len(filterResult) > 0:
            return HttpResponse("用户已存在")
        else:
            resume=Tbresume.objects.create(name=account_name)
            resume.save()
            user = Tbstudent.objects.create(stu_id=account_num, name=account_name, nickname=nickname, phonenumber_phonenumberphonenumber_phonenumber=account_phone, password=passwd_1, res_id=resume)
            user.save()
            return HttpResponse("注册成功")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Company_register(request):
    if request.method == "POST":
        account_name = request.POST.get('ComName')
        account_phone=request.POST.get('phoneNum')
        account_num =request.POST.get('ComLicense')
        passwd_1 = request.POST.get('password')
        filterResult1 = Tbcompany.objects.filter(com_license=account_num)
        filterResult2 = Tbcompany.objects.filter(phone_num=account_phone)
        if len(filterResult1) > 0:
            return HttpResponse("统一信用代码已注册")
        else:
            if len(filterResult2) > 0:
                return HttpResponse("电话号码已注册")
            else:
                user = Tbcompany.objects.create(com_license=account_num, com_name=account_name, phone_num=account_phone, password=passwd_1)
                user.save()
                qualify = Tbqualify.objects.create(com_license=account_num)
                return HttpResponse("注册成功")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Insert_resume(request):
    if request.method == "POST":
        res_id = request.POST.getlist('js传数据的全局变量')  # 唯一标识简历的全局变量
        account_name = request.POST.getlist('js传数据的名字') #获取表单数据用getlist
        age = request.POST.getlist('js传数据的名字')
        sex = request.POST.getlist('js传数据的名字')
        res_asses = request.POST.getlist('js传数据的名字')
        res_edu = request.POST.getlist('js传数据的名字')
        res_work = request.POST.getlist('js传数据的名字')
        res_proj = request.POST.getlist('js传数据的名字')
        res_extra = request.POST.getlist('js传数据的名字')
        res_per = request.POST.getlist('js传数据的名字')
        #a  a a a
        Tbresume.objects.get(id=res_id).update(name=account_name, age=age, sex=sex, res_asses=res_asses, res_edu=res_edu, res_work=res_work, res_proj=res_proj, res_extra=res_extra, res_per=res_per)
        #resume.save()  好像update这种更新方式并不需要save
        return HttpResponse("填写完成")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Reset_password(request):
    if request.method == "POST":
        stu_id=request.POST.get('js传数据的全局变量')
        origin_password=request.POST.get('js传数据的原密码')
        new_password=request.POST.get('js传数据的原密码')

        filterResult1 = Tbstudent.objects.filter(password=origin_password)
        if len(filterResult1) > 0:
            Tbstudent.objects.get(stu_id=stu_id ).update(password=new_password)
            return HttpResponse("密码修改成功")
        else:
            return HttpResponse("原密码输入不正确，请重新输入")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Reset_myinfo_name(request):
    if request.method == "POST":
        stu_id=request.POST.get('js传数据的全局变量')
        name=request.POST.get('js传数据的名字')

        Tbstudent.objects.get(stu_id=stu_id ).update(name=name)
        return HttpResponse("姓名修改成功")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Reset_myinfo_nickname(request):
    if request.method == "POST":
        stu_id=request.POST.get('js传数据的全局变量')
        nickname=request.POST.get('js传数据的名字')

        Tbstudent.objects.get(stu_id=stu_id ).update(nickname=nickname)
        return HttpResponse("昵称修改成功")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Reset_myinfo_phonenumber(request):
    if request.method == "POST":
        stu_id=request.POST.get('js传数据的全局变量')
        phonenumber=request.POST.get('js传数据的名字')

        filterResult1 = Tbstudent.objects.filter(phonenumber_phonenumberphonenumber_phonenumber=phonenumber)
        if len(filterResult1) > 0:
            return HttpResponse("手机号码已注册")
        else:
            Tbstudent.objects.get(stu_id=stu_id ).update(phonenumber_phonenumberphonenumber_phonenumber=phonenumber)
        return HttpResponse("电话号码修改成功")
    else:
        return HttpResponse("请求错误")

@csrf_exempt
def Reset_myinfo_e_mail(request):
    if request.method == "POST":
        stu_id=request.POST.get('js传数据的全局变量')
        e_mail=request.POST.get('js传数据的名字')

        Tbstudent.objects.get(stu_id=stu_id ).update(e_mail=e_mail)
        return HttpResponse("邮箱修改成功")
    else:
        return HttpResponse("请求错误")
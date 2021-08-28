a1 = 40;
b2 =3;
c2= 28;
n2 = 10;
x02 = -0.1;
y02 = 0.5;
z02 = 0.6;

function output = chenmultiscroll(a,b,c,x0,y0,z0,n)
	xvals = zeros(n,1);
	yvals = zeros(n,1);
	zvals = zeros(n,1);
	xvals(1) = x0 + (a*(y0-x0))/1000;
	yvals(1) = y0 + ((c-a)*x0-x0*z0+c*y0)/1000;
	zvals(1) = z0+(x0*y0-b*z0)/1000;
	for index = 2:n
		xvals(index) = xvals(index-1)+ (a*(yvals(index-1)-xvals(index-1)))/1000;
		yvals(index) = yvals(index-1)+((c-a)*xvals(index-1)-xvals(index-1)*zvals(index-1)+c*yvals(index-1))/1000; 
		zvals(index) = zvals(index-1)+(xvals(index-1)*yvals(index-1)-b*zvals(index-1))/1000;
	
	end
	xn = xvals(n);
	yn = yvals(n);
	zn = zvals(n);
	plot3(xvals,yvals,zvals);
	output = [xn, yn, zn];
end

ans = chenmultiscroll(a1,b2,c2,x02,y02,z02,n2);
disp(ans);
